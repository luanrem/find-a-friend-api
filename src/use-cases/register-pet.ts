import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetAge, PetAmbient, PetEnergy, PetSize } from '@prisma/client'
import { OrgDoesNotExistsError } from './errors/org-does-not-exist-error'

interface RegisterPetRequest {
  name: string
  about?: string | null
  age?: PetAge | null
  size?: PetSize | null
  energy?: PetEnergy | null
  ambient?: PetAmbient | null
  petPicturesUrl?: { url: string }[] | null
  org_id: string
  adoptionRequirement?: { requirement: string }[] | null
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) { }

  async execute({
    name,
    about,
    age,
    size,
    energy,
    ambient,
    petPicturesUrl,
    org_id,
    adoptionRequirement,
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const orgFound = await this.orgsRepository.findById(org_id)

    if (!orgFound) {
      throw new OrgDoesNotExistsError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      ambient,
      energy,
      size,
      org: {
        connect: {
          id: orgFound.id
        }
      },
      petPictures: petPicturesUrl ? {
        createMany: {
          data: petPicturesUrl
        }
      } : undefined,
      adoptionRequirement: adoptionRequirement ? {
        createMany: {
          data: adoptionRequirement
        }
      } : undefined
    })

    return {
      pet
    }


  }
}
