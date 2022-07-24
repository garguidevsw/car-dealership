import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    // @UsePipes( ValidationPipe )
    createCar(@Body() createCarDto: CreateCarDto ) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto ) {
        return this.carsService.update(id, updateCarDto);
    }

    // @Put(':id')
    // updatePutCar(
    //     @Param('id', ParseUUIDPipe) id: string,
    //     @Body() body: any ) {
    //     return body;
    // }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.delete(id);
    }
}
