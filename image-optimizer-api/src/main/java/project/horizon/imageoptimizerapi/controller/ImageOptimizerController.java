package project.horizon.imageoptimizerapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.horizon.imageoptimizerapi.exception.ImageProcessingException;
import project.horizon.imageoptimizerapi.service.ImageOptimizerService;
import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageOptimizerController {

    private final ImageOptimizerService imageOptimizerService;

    public ImageOptimizerController(ImageOptimizerService imageOptimizerService) {
        this.imageOptimizerService = imageOptimizerService;
    }

    /**
     * Endpoint for uploading an image to Azure Blob Storage.
     *
     * @param image the MultipartFile representing the image to upload
     * @return ResponseEntity with the image name (without extension) if upload is successful,
     *         or a status of 404 if the image was not found,
     *         or a status of 500 if there is an error during the upload process
     */
    @PostMapping("/upload")
    @CrossOrigin("*")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            String uploadedImageName = imageOptimizerService.uploadImage(image);

            return ResponseEntity.ok(uploadedImageName);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload the image: " + e.getMessage());
        } catch (ImageProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image processing error: " + e.getMessage());
        }
    }

    /**
     * Endpoint for retrieving an optimized image by its name.
     *
     * @param imageName the name of the image to retrieve (without extension)
     * @return ResponseEntity containing the image data as a byte array if found,
     *         or with a status of 404 if the optimized image is not available
     */
    @GetMapping("/optimized/{imageName}")
    @CrossOrigin("*")
    public ResponseEntity<byte[]> getOptimizedImage(@PathVariable String imageName) {
        try {
            return imageOptimizerService.getOptimizedImage(imageName + ".webp")
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));

        } catch (ImageProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
