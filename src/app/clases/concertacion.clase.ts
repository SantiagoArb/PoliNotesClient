export class Concertacion{
  private id_concertacion:number;
    private nom_concertacion:string;
    private  valor_porcentual:number;
    private  doc_maestro:string;
    private id_materia:number;
    private id_usuario:number;


    public constructor() {
    }

    public getId_usuario(){
      return this.id_usuario;
    }

    public setId_usuario(id){
      this.id_usuario = id;
    }

    public getId_concertacion() {
        return this.id_concertacion;
    }

    public setId_concertacion(id_concertacion) {
        this.id_concertacion = id_concertacion;
    }

    public getNom_concertacion() {
        return this.nom_concertacion;
    }

    public  setNom_concertacion( nom_concertacion) {
        this.nom_concertacion = nom_concertacion;
    }

    public getValor_porcentual() {
        return this.valor_porcentual;
    }

    public  setValor_porcentual( valor_porcentual) {
        this.valor_porcentual = valor_porcentual;
    }

    public  getDoc_maestro() {
        return this.doc_maestro;
    }

    public  setDoc_maestro( doc_maestro) {
        this.doc_maestro = doc_maestro;
    }

    public  getId_materia() {
        return this.id_materia;
    }

    public  setId_materia( id_materia) {
        this.id_materia = id_materia;
    }
}
