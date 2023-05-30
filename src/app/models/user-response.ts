export interface UserResponse {
    _id: string
    nome:string;
    dataNasc:Date;
    email:string,
    senha:string,
    seguidores:[string],
    seguindo:[string],
    avatar:string,
}

export interface UserDto{
  nome:string;
  dataNasc:Date;
  email:string,
  senha:string,
  avatar:string,
}
