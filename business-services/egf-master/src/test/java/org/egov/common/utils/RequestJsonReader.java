package org.egov.common.utils;

import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.egov.tracer.model.CustomException;

public class RequestJsonReader {

    public String readRequest(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/request_info.json"), "UTF-8");
        	
            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), "UTF-8");
            return "{\n"+info+","+data+"}";
            
        } catch (IOException e) {
            throw new CustomException("IOEXCEPTION",e.getMessage());
        }
    }
    
    public String readResponse(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/response_info.json"), "UTF-8");
        	
            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), "UTF-8");
            return "{\n"+info+","+data+"}";
            
        } catch (IOException e) {
            throw new CustomException("IOEXCEPTION",e.getMessage());
        }
    }
    
    public String readErrorResponse(String fileName) {
        try {
        	String info=IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream("common/error_info.json"), "UTF-8");
        	
            String data= IOUtils.toString(this.getClass().getClassLoader()
                    .getResourceAsStream(fileName), "UTF-8");
            return "{\n"+info+","+data+"}";
            
        } catch (IOException e) {
            throw new CustomException("IOEXCEPTION",e.getMessage());
        }
    }
    public String getRequestInfo() {
		try {
			String info = IOUtils.toString(
					this.getClass().getClassLoader().getResourceAsStream("common/request_info.json"), "UTF-8");

			return "{\n" + info + "}";

		} catch (IOException e) {
            throw new CustomException("IOEXCEPTION",e.getMessage());
		}
	}
    
}