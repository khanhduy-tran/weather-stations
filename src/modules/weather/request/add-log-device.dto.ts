import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddLogDevice {
    @ApiProperty({
        type: Number,
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    deviceId: number

    @ApiProperty({
        type: Number,
        example: 30
    })
    @IsNumber()
    @IsNotEmpty()
    temperature: number;
}