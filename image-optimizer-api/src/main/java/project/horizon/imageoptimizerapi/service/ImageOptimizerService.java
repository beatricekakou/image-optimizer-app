package project.horizon.imageoptimizerapi.service;

import com.azure.storage.blob.BlobClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ImageOptimizerService {

    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.input-container}")
    private String inputContainerName;

    @Value("${azure.storage.output-container}")
    private String outputContainerName;

    private String getConnectionString() {
        return String.format("DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;EndpointSuffix=core.windows.net",
                accountName, accountKey);
    }

    public String uploadImage(MultipartFile file) throws IOException {
        String blobName = file.getOriginalFilename();

        var inputBlobClient = new BlobClientBuilder()
                .connectionString(getConnectionString())
                .containerName(inputContainerName)
                .blobName(blobName)
                .buildClient();

        inputBlobClient.upload(file.getInputStream(), file.getSize(), true);

        return blobName;
    }

    public byte[] getOptimizedImage(String blobName) throws IOException {
        var outputBlobClient = new BlobClientBuilder()
                .connectionString(getConnectionString())
                .containerName(outputContainerName)
                .blobName(blobName)
                .buildClient();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        outputBlobClient.downloadStream(outputStream);
        return outputStream.toByteArray();
    }

}
