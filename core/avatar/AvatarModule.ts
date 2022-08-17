import CoreEngine from '../CoreEngine';
import CoreEngineModule from '../CoreEngineModule';
import AvatarData from './AvatarData';

export default class AvatarModule implements CoreEngineModule {
    public avatars: Map<number, AvatarData> = new Map();

    async init(): Promise<void> {
        let config = await CoreEngine.readJsonResource("AvatarExcelConfigData");
        for (let item of config) {
            if (item.useType != "AVATAR_FORMAL") {
                continue;
            }
            let avatar = new AvatarData(item);
            if (avatar.id == 10000005/*空*/ || avatar.id == 10000007/*莹*/) {
                //暂不支持旅行者
                continue;
            }
            this.avatars.set(avatar.id, avatar);
        }
    }
}