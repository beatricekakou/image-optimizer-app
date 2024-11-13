package project.horizon.imageoptimizerapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.horizon.imageoptimizerapi.service.ImageOptimizerService;
import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping("/api/images")
public class ImageOptimizerController {

    private final ImageOptimizerService imageOptimizerService;

    public ImageOptimizerController(ImageOptimizerService imageOptimizerService) {
        this.imageOptimizerService = imageOptimizerService;
    }


    @PostMapping("/upload")
    @CrossOrigin("*")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            String uploadedImage = imageOptimizerService.uploadImage(image);

            if(uploadedImage != null && !uploadedImage.isEmpty())
                uploadedImage = uploadedImage.substring(0, uploadedImage.lastIndexOf('.'));

            return Objects.isNull(uploadedImage)
                    ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("The image was not found.")
                    : ResponseEntity.status(HttpStatus.OK).body(uploadedImage);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the image: " + e.getMessage());
        }
    }


    @GetMapping("/optimized/{imageName}")
    @CrossOrigin("*")
    public ResponseEntity<byte[]> getOptimizedImage(@PathVariable String imageName) throws IOException {
        byte[] optimizedImageUrl = imageOptimizerService.getOptimizedImage(imageName + ".webp");
        return ResponseEntity.ok(optimizedImageUrl);
    }
}
