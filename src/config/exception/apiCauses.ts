import { HttpStatus } from "@nestjs/common";
import { JsonException } from "./exception.dto";

export class ApiCauses {
    public static DEVICE_INVALID = new JsonException('Device invalid', HttpStatus.BAD_REQUEST, 'DEVICE_INVALID');
}