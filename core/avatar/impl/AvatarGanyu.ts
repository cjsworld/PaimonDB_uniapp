import CalcContext from "@/core/foundation/CalcContext";
import DamageType from "@/core/foundation/DamageType";
import ElemType from "@/core/foundation/ElemType";
import SkillType from "../../skill/SkillType";
import AvatarImpl from "../AvatarImpl";
import SkillOption from "../SkillOption";

export default new class AvatarGanyu extends AvatarImpl {
    getAvatarId(): number {
        return 10000037;
    }
    
    getSkillOptions(): SkillOption[] {
        return [
            new GanyuSkillA1(),
            new GanyuSkillA2()
        ]
    }
}

class GanyuSkillA1 extends SkillOption {
    getName(): String {
        return "重击-蓄力第二段";
    }
    getSkillElemType(): ElemType {
        return ElemType.Ice;
    }
    
    prepare(ctx: CalcContext) {
        ctx.damageType = DamageType.AZ;
        ctx.skillRate = ctx.avatar.getSkillProudData(SkillType.A).params[8];
    }
    
    apply(ctx: CalcContext) {
        
    }
}

class GanyuSkillA2 extends SkillOption {
    getName(): String {
        return "重击-蓄力范围伤害";
    }
    getSkillElemType(): ElemType {
        return ElemType.Ice;
    }
    
    prepare(ctx: CalcContext) {
        ctx.damageType = DamageType.AZ;
        ctx.skillRate = ctx.avatar.getSkillProudData(SkillType.A).params[9];
    }
    
    apply(ctx: CalcContext) {
        
    }
}