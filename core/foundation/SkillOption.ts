import ElemType from "@/core/foundation/ElemType";
import DamageType from "@/core/foundation/DamageType";
import CalcContext from "@/core/foundation/CalcContext";

export default abstract class SkillOption {
    abstract value: number;
    abstract text: string;
    abstract skillElemType: ElemType;
    abstract damageType: DamageType;

    abstract prepare(ctx: CalcContext): void;
    abstract apply(ctx: CalcContext): void;
}