export class CriarUsuarioDTO {

    get nome (): string {
        return this.nome;
    }

    set nome (nome: string){
        this.nome = nome;
    }

    get ativo (): boolean {
        return this.ativo;
    }

    set ativo (ativo: boolean){
        this.ativo = ativo;
    }
}

