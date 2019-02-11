export class materia_est{
  private id_materia:number;
   private doc_estudiante:string;
   private nom_estudiante:string;
   private id_con:number;
   private id_nota:number;
   private nota:number;
   private comentario:string;

   public estMat() {
   }

   public getId_con(){
     return this.id_con;
   }

   public getComentario(){
     return this.comentario;
   }
   public setComentario(coment){
     this.comentario = coment;
   }


   public setId_con(idx:number){
     this.id_con = idx;
   }

   public getId_nota(){
     return this.id_nota;
   }

   public setId_nota(idx:number){
     this.id_nota = idx;
   }

   public getNota(){
     return this.nota;
   }

   public setNota(nota){
     this.nota = nota;
   }

   public  getId_materia() {
       return this.id_materia;
   }

   public  setId_materia( id_materia:number) {
       this.id_materia = id_materia;
   }

   public  getDoc_estudiante() {
       return this.doc_estudiante;
   }

   public  setDoc_estudiante( doc_estudiante:string) {
       this.doc_estudiante = doc_estudiante;
   }

   public  getNom_estudiante() {
       return this.nom_estudiante;
   }

   public  setNom_estudiante( nom_estudiante:string) {
       this.nom_estudiante = nom_estudiante;
   }
}
