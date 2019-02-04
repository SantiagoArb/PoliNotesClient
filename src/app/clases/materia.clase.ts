export class Materia{
  private  ID_MATERIA:string;
    private  CODIGO_MATERIA:string;
    private  NOMBRE_MATERIA:string;
    private  FACULTAD_MATERIA:number;
    private  ID_MAESTRO:number;


    public Materia() {
    }


    public  getID_MAESTRO() {
        return this.ID_MAESTRO;
    }

    public  setID_MAESTRO(ID_MAESTRO:number) {
        this.ID_MAESTRO = ID_MAESTRO;
    }

    public  getID_MATERIA() {
        return this.ID_MATERIA;
    }

    public  setID_MATERIA( ID_MATERIA:string) {
        this.ID_MATERIA = ID_MATERIA;
    }

    public  getCODIGO_MATERIA() {
        return this.CODIGO_MATERIA;
    }

    public  setCODIGO_MATERIA( CODIGO_MATERIA:string) {
        this.CODIGO_MATERIA = CODIGO_MATERIA;
    }

    public  getNOMBRE_MATERIA() {
        return this.NOMBRE_MATERIA;
    }

    public  setNOMBRE_MATERIA( NOMBRE_MATERIA:string) {
        this.NOMBRE_MATERIA = NOMBRE_MATERIA;
    }

    public  getFACULTAD_MATERIA() {
        return this.FACULTAD_MATERIA;
    }

    public  setFACULTAD_MATERIA( FACULTAD_MATERIA:number) {
        this.FACULTAD_MATERIA = FACULTAD_MATERIA;
    }
}
