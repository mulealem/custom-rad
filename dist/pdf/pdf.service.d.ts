export declare class PdfService {
    private readonly logger;
    private browserPromise;
    private lastLaunchTs;
    private getBrowser;
    private restartBrowser;
    private withTimeout;
    generatePdfFromHtml(htmlContent: string): Promise<Buffer>;
}
