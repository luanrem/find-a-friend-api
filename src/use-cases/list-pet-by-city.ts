import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "@prisma/client"


interface ListPetByCityRequest {
  city: string
  query: object
}

interface ListPetByCityResponse {
  pet: Pet[] | null
}


export class ListPetByCityUseCase {

  constructor(
    private petsRepository: PetsRepository,
  ) { }

  async execute({ city, query }: ListPetByCityRequest): Promise<ListPetByCityResponse> {
    const pets = await this.petsRepository.find(query, city)

    return {
      pet: pets
    }
  }
}