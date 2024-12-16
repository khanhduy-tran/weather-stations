import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddDevice {
    @ApiProperty({
        type: String,
        example: 'Device 1'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        example: 'IOT 1'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}