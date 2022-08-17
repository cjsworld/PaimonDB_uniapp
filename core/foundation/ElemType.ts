import PropType from './PropType';

export default class ElemType {
    static All: ElemType[] = [];

    static Fire = new ElemType(0, "Fire", "火", 104111, PropType.FireAddHurt, PropType.FireSubHurt);
    static Water = new ElemType(1, "Water", "水", 104121, PropType.WaterAddHurt, PropType.WaterSubHurt);
    static Wind = new ElemType(2, "Wind", "风", 104151, PropType.WindAddHurt, PropType.WindSubHurt);
    static Elec = new ElemType(3, "Elec", "雷", 104141, PropType.ElecAddHurt, PropType.ElecSubHurt);
    static Grass = new ElemType(4, "Grass", "草", 104131/*推测*/, PropType.GrassAddHurt, PropType.GrassSubHurt);
    static Ice = new ElemType(5, "Ice", "冰", 104161, PropType.IceAddHurt, PropType.IceSubHurt);
    static Rock = new ElemType(6, "Rock", "岩", 104171, PropType.RockAddHurt, PropType.RockSubHurt);
    static Physical = new ElemType(7, "Physical", "物理", null, PropType.PhysicalAddHurt, PropType.PhysicalSubHurt);


    static getByMatID(matID: number | undefined): ElemType {
        if (!matID) {
            return ElemType.Physical;
        }
        var t = ElemType.All.find(e => e.matId == matID);
        if (t == null) {
            return ElemType.Physical;
        }
        return t;
    }

    index: number;
    name: string;
    desc: string;
    matId: number | null;


    addHurtType: PropType;
    subHurtType: PropType;

    private constructor(index: number, name: string, desc: string, matId: number | null, addHurtType: PropType, subHurtType: PropType) {
        ElemType.All.push(this);
        this.index = index;
        this.name = name;
        this.desc = desc;
        this.matId = matId;
        this.addHurtType = addHurtType;
        this.subHurtType = subHurtType;
    }

    toString(): string {
        return this.desc;
    }
}