package project.horizon.imageoptimizerapi.service;

import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.models.BlobStorageException;
import com.sun.jna.platform.win32.Guid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.horizon.imageoptimizerapi.exception.ImageProcessingException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class ImageOptimizerService {

    private static final Logger logger = Logger.getLogger(ImageOptimizerService.class.getName());

    @Value("${azure.storage.connection-string")
    private String connectionStringTemplate;

    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.input-container}")
    private String inputContainerName;

    @Value("${azure.storage.output-container}")
    private String outputContainerName;

    private String getConnectionString() {
        return String.format(connectionStringTemplate, accountName, accountKey);
    }

    /**
     * Uploads an image file to the Azure Blob Storage input container.
     *
     * @param image the image file to be uploaded as a {@link MultipartFile}
     * @return the name of the uploaded image -with extension-
     * @throws IOException if an error occurs while reading the file
     */
    public String uploadImage(MultipartFile image) throws IOException {
        String originalImageName = image.getOriginalFilename();
        String imageExtension = originalImageName.substring(originalImageName.lastIndexOf('.'));
        String imageName = Guid.GUID.newGuid().toGuidString();
        imageName = imageName.replace("{","").replace("}","");

        try {
            var inputBlobClient = new BlobClientBuilder()
                    .connectionString(getConnectionString())
                    .containerName(inputContainerName)
                    .blobName(imageName+imageExtension)
                    .buildClient();


            inputBlobClient.upload(image.getInputStream(), image.getSize(), true);

            return imageName;

        } catch (BlobStorageException e) {
            logger.severe("Azure Blob Storage error during upload: " + e.getMessage());
            throw new ImageProcessingException("Failed to upload image to Azure Blob Storage", e);

        } catch (IOException e) {
            logger.severe("I/O error during upload: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Retrieves the optimized image from the Azure Blob Storage output container.
     *
     * @param imageName the name of the image -with .webp extension- to retrieve
     * @return an {@link Optional} containing the byte array of the optimized image data,
     * or empty if the blob does not exist
     */
    public Optional<byte[]> getOptimizedImage(String imageName) {
        try {
            var outputBlobClient = new BlobClientBuilder()
                    .connectionString(getConnectionString())
                    .containerName(outputContainerName)
                    .blobName(imageName)
                    .buildClient();

            if (!outputBlobClient.exists()) {
                logger.warning("Image not found: " + imageName);
                return Optional.empty();
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            outputBlobClient.downloadStream(outputStream);
            return Optional.of(outputStream.toByteArray());

        } catch (BlobStorageException e) {
            logger.severe("Azure Blob Storage error during download: " + e.getMessage());
            throw new ImageProcessingException("Failed to retrieve optimized image from Azure Blob Storage", e);

        }
    }
}
