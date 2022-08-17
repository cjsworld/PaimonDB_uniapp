export default class SkillType {
    static All: SkillType[] = [];
    
    static A = new SkillType(0, "普通攻击");
    static E = new SkillType(1, "元素战技");
    static Shift = new SkillType(2, "冲刺");
    static Q = new SkillType(5, "元素爆发");
    
    static getByTriggerID(triggerID: number): SkillType {
        var t = SkillType.All.find(e => e.triggerID == triggerID);
        if (t == null) {
            throw new Error(`Unknown skill trigger id: ${triggerID}`);
        }
        return t;
    }

    triggerID: number;
    desc: string;
    
    private constructor(triggerID: number, desc: string) {
        SkillType.All.push(this);
        this.triggerID = triggerID;
        this.desc = desc;
    }
    
    toString(): string {
        return this.desc;
    }
}