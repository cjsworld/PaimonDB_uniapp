/**
 * 武器类型
 */
export default class WeaponType {
    static All: WeaponType[] = [];
    
    static Sword = new WeaponType("Sword", "单手剑", "WEAPON_SWORD_ONE_HAND");
    static Claymore = new WeaponType("Claymore", "双手剑", "WEAPON_CLAYMORE");
    static Pole = new WeaponType("Pole", "长枪", "WEAPON_POLE");
    static Catalyst = new WeaponType("Catalyst", "法器", "WEAPON_CATALYST");
    static Bow = new WeaponType("Bow", "弓", "WEAPON_BOW");
    
    static getByConfigName(configName: string): WeaponType {
        var t = WeaponType.All.find(e => e.configName == configName);
        if (t == null) {
            throw new Error(`Unknown weapon type: ${configName}`);
        }
        return t;
    }
    
    name: string;
    desc: string;
    configName: string;
    
    private constructor(name: string, desc: string, configName: string) {
        WeaponType.All.push(this);
        this.name = name;
        this.desc = desc;
        this.configName = configName;
    }
    
    toString(): string {
        return this.desc;
    }
}