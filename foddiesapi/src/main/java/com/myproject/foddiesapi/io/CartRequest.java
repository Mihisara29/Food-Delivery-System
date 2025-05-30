package com.myproject.foddiesapi.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartRequest {

    private String foodId;

}
