

export class Usuario{

    private ID_USER:Number;
    private DOC_USER:string;
    private NICK_USER:string;
    private PASSWORD_USER:string;
    private NOMBRE_USER:string;
    private APELLIDOS_USER:string;
    private CELULAR_USER:string;
    private CORREO_USER:string;
    private ID_PERFIL_USER:Number;
    private ESTADO_USER:Number;

    constructor(){ }

    setId_user(ide){
      this.ID_USER = ide;
    }
    getId_user(){
      return this.ID_USER;
    }
    setDoc_user(doc){
      this.DOC_USER = doc;
    }
    getDoc_user(){
      return this.DOC_USER;
    }

    setNick_user(nick){
      this.NICK_USER = nick;
    }
    getNick_user(){
      return this.NICK_USER;
    }

    getPassword_user() {
       return this.PASSWORD_USER;
   }

   setPassword_user(pass) {
       this.PASSWORD_USER = pass;
   }

    getNombre_user() {
       return this.NOMBRE_USER;
   }

   setNombre_user( name) {
       this.NOMBRE_USER = name;
   }

   getApellidos_user() {
       return this.APELLIDOS_USER;
   }

   setApellidos_user(apellidos_user) {
       this.APELLIDOS_USER = apellidos_user;
   }

   getCelular_user() {
       return this.CELULAR_USER;
   }

   setCelular_user(celular_user) {
       this.CELULAR_USER = celular_user;
   }

   getCorreo_user() {
       return this.CORREO_USER;
   }

   setCorreo_user( correo_user) {
       this.CORREO_USER = correo_user;
   }

   getId_perfil_user() {
       return this.ID_PERFIL_USER;
   }

   setId_perfil_user(id_perfil_user) {
       this.ID_PERFIL_USER = id_perfil_user;
   }

   getEstado_user() {
       return this.ESTADO_USER;
   }

   setEstado_user( estado_user) {
       this.ESTADO_USER = estado_user;
   }



}
