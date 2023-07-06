import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface ListPetByIdRequest {
  id: string
}

interface ListPetByIdResponse {
  pet: Pet | null
}

export class ListPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ id }: ListPetByIdRequest): Promise<ListPetByIdResponse> {

    const pet = await this.petsRepository.findById(id)

    return { pet }
  }
}