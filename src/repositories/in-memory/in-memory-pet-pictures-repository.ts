import { Prisma, PetPicture } from "@prisma/client";
import { PetPicturesRepository } from "../pet-pictures-repository";


export class InMemoryPetPicturesRepository implements PetPicturesRepository {
  create(data: Prisma.PetPictureUncheckedCreateInput): Promise<PetPicture> {
    throw new Error("Method not implemented.");
  }

}