import UpgradeModule from '@/core/upgrade/UpgradeModule';
import AffixModule from '@/core/affix/AffixModule';
import SkillModule from '@/core/skill/SkillModule';
import WeaponModule from '@/core/weapon/WeaponModule';
import AvatarModule from '@/core/avatar/AvatarModule';
import RelicModule from '@/core/relic/RelicModule';

import PropType from '@/core/foundation/PropType';
import RelicSlotType from '@/core/relic/RelicSlotType';
import MonsterInfo from '@/core/monster/MonsterInfo';
import CalcContext from '@/core/foundation/CalcContext';

class CoreEngine {
    private inited = false;
    upgrade = new UpgradeModule();
    affix = new AffixModule();
    skill = new SkillModule();
    weapon = new WeaponModule();
    avatar = new AvatarModule();
    relic = new RelicModule();

    async init(): Promise<void> {
        if (this.inited) {
            return;
        }
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
        this.inited = true;
        let diff = new Date().valueOf() - startTime.valueOf();
        console.log(`CoreEngine init finish in ${diff} ms`);
        console.log(this);
    }

    async readJsonResource(filename: string): Promise<any> {
        //console.log("read config " + filename);
        return new Promise((resolve, reject) => {
            uni.request({
                url: `static/config/${filename}.json`,
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
    
    testGanyu() {
        let ganyu = this.avatar.avatars.get(10000037)!;
        let info = ganyu.newInfo();
        let weapon = this.weapon.weapons.get(15502)!;
        info.weapon = weapon.newInfo();
    
        let relicSet = this.relic.sets.get(14001)!; //冰套
        let relic;
        //花
        relic = relicSet.newInfo(RelicSlotType.Flower, 5);
        relic.addSubProp(PropType.DEF, 19);
        relic.addSubProp(PropType.PercentATK, 0.152);
        relic.addSubProp(PropType.ATK, 37);
        relic.addSubProp(PropType.CritHurt, 0.202);
        info.relic.putRelic(relic);
    
        //羽毛
        relic = relicSet.newInfo(RelicSlotType.Leather, 5);
        relic.addSubProp(PropType.PercentATK, 0.105);
        relic.addSubProp(PropType.CritHurt, 0.326);
        relic.addSubProp(PropType.CritRate, 0.039);
        relic.addSubProp(PropType.HP, 269);
        info.relic.putRelic(relic);
    
        //沙漏
        relic = relicSet.newInfo(RelicSlotType.Sand, 5);
        relic.mainPropType = PropType.PercentATK;
        relic.addSubProp(PropType.CritRate, 0.097);
        relic.addSubProp(PropType.ChargeRate, 0.091);
        relic.addSubProp(PropType.ATK, 35);
        relic.addSubProp(PropType.CritHurt, 0.148);
        info.relic.putRelic(relic);
    
        //杯子
        relic = relicSet.newInfo(RelicSlotType.Cup, 5);
        relic.mainPropType = PropType.IceAddHurt;
        relic.addSubProp(PropType.PercentDEF, 0.117);
        relic.addSubProp(PropType.CritRate, 0.031);
        relic.addSubProp(PropType.PercentHP, 0.122);
        relic.addSubProp(PropType.CritHurt, 0.187);
        info.relic.putRelic(relic);
    
        //头
        relic = relicSet.newInfo(RelicSlotType.Cap, 5);
        relic.mainPropType = PropType.CritHurt;
        relic.addSubProp(PropType.DEF, 37);
        relic.addSubProp(PropType.HP, 538);
        relic.addSubProp(PropType.ATK, 33);
        relic.addSubProp(PropType.CritRate, 0.066);
        info.relic.putRelic(relic);
    
        let panel = info.getTotalPanel();
    
        //Trace.WriteLine(panel);
    
        console.log(`名称: ${ganyu.name}`);
        console.log(`生命值: ${panel.totalHP()}`);
        console.log(`攻击力: ${panel.totalATK()}`);
        console.log(`防御力: ${panel.totalDEF()}`);
        console.log(`暴击率: ${panel.get(PropType.CritRate)}`);
        console.log(`暴击伤害: ${panel.get(PropType.CritHurt)}`);
        console.log(`元素充能效率: ${panel.get(PropType.ChargeRate)}`);
        console.log(`冰元素伤害加成: ${panel.get(PropType.IceAddHurt)}`);
    
        //HP: 16582
        //ATK: 2508
        //DEF: 759
        //CritRate: 28.3%
        //CritHurt: 236.9%
        //ChargeRate: 109.1%
        //IceAddHurt: 61.6%
        console.log("===============");
    
        let monster = new MonsterInfo();
        monster.level = 88;
        monster.props.addProp(PropType.IceSubHurt.by(0.10000000149011612));
        //monster.props.addProp(PropType.IceSubHurt.by(-0.15)); //TODO 甘雨1命效果
    
        let ctx = new CalcContext();
        ctx.avatar = info;
        ctx.monster = monster;
        ctx.skillOption = ganyu.impl!.getSkillOptions()[0]; //重击二段范围伤害
        let damage = ctx.calcDamage();
        console.log(`暴击伤害值: ${damage}`);
        //36416.42053826135
    }
}

export default new CoreEngine();