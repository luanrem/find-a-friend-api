import { OrgsRepository } from "@/repositories/orgs-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { Pet } from "@prisma/client"


interface ListPetByCityRequest {
  city: string
}

interface ListPetByCityResponse {
  pet: Pet[] | null
}


export class ListPetByCityUseCase {

  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) { }

  async execute({ city }: ListPetByCityRequest): Promise<ListPetByCityResponse> {
    console.log('city', city)

    const orgsByCity = await this.orgsRepository.findByCity(city)

    if (!orgsByCity) {
      return {
        pet: null
      }
    }

    const pets = await this.petsRepository.findByOrgCity(city)

    return {
      pet: pets
    }
  }
}