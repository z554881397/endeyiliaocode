package com.github.chenlijia1111.utils.image;

import com.github.chenlijia1111.utils.core.IOUtil;
import com.github.chenlijia1111.utils.core.RandomUtil;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import java.io.File;
import java.io.OutputStream;
import java.util.HashMap;

/**
 * 二维码工具类
 *
 * @author chenlijia
 * @version 1.0
 * @since 2019/7/12 0012 下午 3:25
 **/
public class QRCodeUtil {

    private static final String format = "png";

    private BitMatrix bitMatrix;

    //二维码宽
    private Integer width = 300;

    //二维码高
    private Integer height = 300;

    public QRCodeUtil(Integer width, Integer height) {
        this.width = width;
        this.height = height;
    }

    public QRCodeUtil() {
    }

    /**
     * 生成二维码
     *
     * @param msg 信息
     */
    private void createQRCode(String msg) throws WriterException {
        HashMap<EncodeHintType, Object> hashMap = new HashMap<>();
        hashMap.put(EncodeHintType.CHARACTER_SET, "utf-8");
        //纠错等级
        hashMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
        //图片边距
        hashMap.put(EncodeHintType.MARGIN, 2);
        bitMatrix = new MultiFormatWriter().encode(msg, BarcodeFormat.QR_CODE, width, height, hashMap);
    }

    /**
     * 将二维码输出到文件
     *
     * @param content 二维码内容
     * @param file    输出文件
     * @return
     */
    public boolean output(String content, File file) {
        try {
            createQRCode(content);
            MatrixToImageWriter.writeToPath(bitMatrix, format, file.toPath());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 将二维码输出到文件
     * 带logo
     *
     * @param content 二维码内容
     * @param file    输出文件
     * @return
     */
    public boolean outputWithLogo(String content, File file, File logoFile) {
        try {
            createQRCode(content);
            MatrixToImageWriter.writeToPath(bitMatrix, format, file.toPath());
            //进行合并图片
            ImageMergeUtil.mergeImage(logoFile, file, file, 120, 120, 60, 60);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


    /**
     * 将二维码输出到输出流
     *
     * @param content      二维码内容
     * @param outputStream 输出流
     */
    public void output(String content, OutputStream outputStream) {
        try {
            createQRCode(content);
            MatrixToImageWriter.writeToStream(bitMatrix, format, outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 将二维码输出到输出流
     *
     * @param content      二维码内容
     * @param outputStream 输出流
     * @param logoFile     logo文件
     */
    public void outputWithLogo(String content, OutputStream outputStream, File logoFile) {
        try {
            createQRCode(content);
            //创建一个临时文件用于装载二维码
            File tempFile = File.createTempFile(RandomUtil.createUUID(), ".png");
            outputWithLogo(content, tempFile, logoFile);

            //再将临时文件输出到输出流中
            IOUtil.writeFile(tempFile, outputStream);
            tempFile.deleteOnExit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
