<template>
    <view>
        <uni-title type="h2">伤害计算器</uni-title>
        <uni-section title="角色配置" type="line">
            <uni-forms style="margin-left: 20px;">
                <view class="inline-form-item">
                    <uni-forms-item label="角色" label-width="40px" style="width: 250px;">
                        <uni-data-select v-model="avatar.id" :localdata="avatarOptions" :clear="false"
                            @change="onAvatarChange" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="命座" label-width="50px" style="width: 130px;">
                        <uni-data-select v-model="avatar.constellation" :localdata="constellationOptions"
                            :clear="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="等级" label-width="40px" style="width: 90px;">
                        <uni-easyinput v-model="avatar.level" type="number" :clearable="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item style="width: 75px;">
                        <uni-data-checkbox v-model="avatar.promoted" multiple :localdata="promoteOptions" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="技能A" label-width="55px" style="width: 140px;">
                        <uni-data-select v-model="avatar.skillLevels[0]" :localdata="skillLevelOptions" :clear="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="技能E" label-width="55px" style="width: 140px;">
                        <uni-data-select v-model="avatar.skillLevels[1]" :localdata="skillLevelOptions" :clear="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="技能Q" label-width="55px" style="width: 140px;">
                        <uni-data-select v-model="avatar.skillLevels[2]" :localdata="skillLevelOptions" :clear="false" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </uni-section>
        <uni-section title="武器配置" type="line">
            <uni-forms style="margin-left: 20px;">
                <view class="inline-form-item">
                    <uni-forms-item label="武器" label-width="40px" style="width: 250px;">
                        <uni-data-select v-model="weapon.id" :localdata="weaponOptions" :clear="false"
                            @change="onWeaponChange" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="精练" label-width="50px" style="width: 130px;">
                        <uni-data-select v-model="weapon.refine" :localdata="constellationOptions" :clear="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item label="等级" label-width="40px" style="width: 90px;">
                        <uni-easyinput v-model="weapon.level" type="number" :clearable="false" />
                    </uni-forms-item>
                </view>

                <view class="inline-form-item">
                    <uni-forms-item style="width: 75px;">
                        <uni-data-checkbox v-model="weapon.promoted" multiple :localdata="promoteOptions" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </uni-section>
        <uni-section title="敌人配置" type="line">
        </uni-section>
        <uni-section title="技能配置" type="line">
            <uni-forms style="margin-left: 20px;">
                <view class="inline-form-item">
                    <uni-forms-item label="技能" label-width="40px" style="width: 250px;">
                        <uni-data-select v-model="skillOptionId" :localdata="skillOptions" :clear="false" />
                    </uni-forms-item>
                </view>
            </uni-forms>
        </uni-section>
        <uni-section title="伤害计算结果" type="line">
            <view style="margin-left: 20px;">
                <button type="primary" @click="calcDamage"><text class="word-btn-white">计算伤害</text></button>
                <text>暴击伤害：{{damage}}</text>
            </view>
        </uni-section>
    </view>
</template>

<script>
    import CoreEngine from '@/core/CoreEngine';
    import PropType from '@/core/foundation/PropType';
    import RelicSlotType from '@/core/relic/RelicSlotType';
    import MonsterInfo from '@/core/monster/MonsterInfo';
    import CalcContext from '@/core/foundation/CalcContext';

    export default {
        data() {
            return {
                avatarOptions: [],
                promoteOptions: [{
                    value: 1,
                    text: "突破"
                }],
                skillLevelOptions: [],
                constellationOptions: [],
                weaponOptions: [],
                skillOptions: [],

                avatar: {
                    //id: 0,
                    id: 10000037,
                    level: 90,
                    promoted: [],
                    skillLevels: [10, 10, 10],
                    constellation: 0
                },
                avatarData: undefined,

                weapon: {
                    //id: 0,
                    id: 15502,
                    level: 90,
                    promoted: [],
                    refine: 1,
                },
                weaponData: undefined,

                skillOptionId: 0,
                skillOption: undefined,
                
                damage: 0,
            }
        },
        methods: {
            async onLoad() {
                await CoreEngine.init();
                //CoreEngine.testGanyu();

                this.avatarData = CoreEngine.avatar.avatars.get(this.avatar.id);
                this.weaponData = CoreEngine.weapon.weapons.get(this.weapon.id);

                this.avatarOptions = CoreEngine.avatar.getAvatarOptions();
                this.skillLevelOptions = CoreEngine.skill.getSkillLevelOptions();
                this.constellationOptions = CoreEngine.avatar.getConstellationOptions();

                if (!this.avatar.id && this.avatarOptions.length > 0) {
                    this.avatar.id = this.avatarOptions[0].value;
                }
                this.onAvatarChange(this.avatar.id);
            },

            onAvatarChange(id) {
                if (!id) {
                    return;
                }
                this.avatarData = CoreEngine.avatar.avatars.get(id);
                if (this.avatarData.impl) {
                    this.skillOptions = this.avatarData.impl.getSkillOptions();
                    console.log(this.skillOptions);
                    this.skillOptionId = 0;
                }
                this.weaponOptions = CoreEngine.weapon.getWeaponOptions(this.avatarData.weaponType);
                if ((!this.weapon.id || !this.weaponData || this.weaponData.weaponType != this.avatarData.weaponType) &&
                    this.weaponOptions.length > 0) {
                    this.weapon.id = this.weaponOptions[0].value;
                    this.onWeaponChange(this.weapon.id);
                }
            },
            onWeaponChange(id) {
                this.weaponData = CoreEngine.weapon.weapons.get(id);
            },
            calcDamage() {
                if (!this.avatarData || !this.weaponData) {
                    this.damage = 0;
                    return;
                }
                let info = this.avatarData.newInfo();
                info.constellation = this.avatar.constellation;
                info.level = this.avatar.level;
                info.promoted = this.avatar.promoted.length > 0;
                info.skillLevels = this.avatar.skillLevels;
                
                info.weapon = this.weaponData.newInfo();
                info.weapon.refine = this.weapon.refine;
                info.weapon.level = this.weapon.level;
                info.weapon.promoted = this.weapon.promoted.length > 0;
                    
                let relicSet = CoreEngine.relic.sets.get(14001); //冰套
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
                    
                console.log(`名称: ${this.avatarData.name}`);
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
                ctx.skillOption = this.skillOptions[this.skillOptionId]; //重击二段范围伤害
                this.damage = ctx.calcDamage();
                console.log(`暴击伤害值: ${this.damage}`);
            }
        }
    }
</script>

<style>
    .inline-form-item {
        display: inline-block;
        margin-right: 20px;
    }
</style>
