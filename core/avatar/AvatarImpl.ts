import CoreEngine from "../CoreEngine";
import AvatarData from "./AvatarData";
import SkillOption from "./SkillOption";

export default abstract class AvatarImpl {
    abstract getAvatarId(): number;
    abstract getSkillOptions(): SkillOption[];
    
    avatarData: AvatarData;
    
    constructor() {
        this.avatarData = CoreEngine.avatar.avatars.get(this.getAvatarId());
        this.avatarData.impl = this;
    }
}