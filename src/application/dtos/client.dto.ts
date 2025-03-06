// src/application/dtos/client.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  telefone!: string;
}   