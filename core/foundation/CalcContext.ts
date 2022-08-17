import AvatarInfo from "@/core/avatar/AvatarInfo"
import SkillOption from "@/core/avatar/SkillOption";
import MonsterInfo from "@/core/monster/MonsterInfo";
import PropPanel from "./PropPanel"
import DamageType from './DamageType';

export default class CalcContext {
    avatar: AvatarInfo;
    
    monster: MonsterInfo;
    
    skillOption: SkillOption;
    
    
    minePanel: PropPanel;
    
    targetPanel: PropPanel;
    
    damageType: DamageType;
    
    skillRate: number;
    
    reactionRate: number;
    
    constructor() {
        
    }
    
    calcDamate(): number {
        
        return 0;
    }
}