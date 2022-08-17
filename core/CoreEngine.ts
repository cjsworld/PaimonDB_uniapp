import UpgradeModule from '@/core/upgrade/UpgradeModule';
import AffixModule from '@/core/affix/AffixModule';
import SkillModule from '@/core/skill/SkillModule';
import WeaponModule from '@/core/weapon/WeaponModule';
import AvatarModule from '@/core/avatar/AvatarModule';
import RelicModule from '@/core/relic/RelicModule';

class CoreEngine {
    upgrade = new UpgradeModule();
    affix = new AffixModule();
    skill = new SkillModule();
    weapon = new WeaponModule();
    avatar = new AvatarModule();
    relic = new RelicModule();

    async init(): Promise<void> {
        console.log("CoreEngine init start");
        let startTime = new Date();
        this.textMap = await this.readJsonResource("TextMapCHS");
        await this.upgrade.init();
        await this.affix.init();
        await this.skill.init();
        await this.weapon.init();
        await this.avatar.init();
        await this.relic.init();
        this.textMap = undefined;
        let diff = new Date().valueOf() - startTime.valueOf();
        console.log(`CoreEngine init finish in ${diff} ms`);
        console.log(this);
    }
    
    async readJsonResource(filename: string): Promise<any> {
        //console.log("read config " + filename);
        return new Promise((resolve, reject) => {
            uni.request({
                url:`static/config/${filename}.json`,
                success: (res) => {
                    resolve(res.data);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }
    
    textMap: any
    getText(hash: number): string {
        if (!this.textMap || !hash) {
            return ""
        } else {
            let s = this.textMap[hash.toString()];
            if (!s) {
                return "";
            } else {
                return s;
            }
        }
    }
}

export default new CoreEngine();