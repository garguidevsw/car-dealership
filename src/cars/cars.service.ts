import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dtos/index';

import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Honda',
        //     model: 'Civic'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Jeep',
        //     model: 'Cherokee'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Nissan',
        //     model: 'Rogue'
        // },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find( car => car.id === id );

        if(!car) {
            throw new NotFoundException(`Car with id: ${ id } not found`);
        }

        return car;
    }

    create( createCarDto: CreateCarDto ) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }
        
        this.cars.push(newCar);

        return newCar;
    }

    update(id:  string ,updateCarDto: UpdateCarDto ) {
        let updateCar = this.findOneById(id);

        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException(`Car ID is not valid`);
        
        this.cars = this.cars.map( car => {
            if(car.id === id){
                updateCar = {
                    ...updateCar,
                    ...updateCarDto,
                    id
                }
                return updateCar;
            }
            
            return car;

        });

        return updateCar;
    }

    delete( id: string ) {
        const car = this.findOneById(id);

        this.cars = this.cars.filter( car => car.id !== id);

        // return; // envia undefined
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
    }
}
