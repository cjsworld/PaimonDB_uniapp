<template>
    <view>
        <view class="uni-title uni-common-pl">伤害计算器</view>
        <form>
            <view class="uni-form-item uni-row">
                <view class="title">角色</view>
                <view>
                    <picker mode="selector" selector-type="select" :value="avatarSelected" :range="avatarList" @change="bindPickerChange" range-key="name" style="width: 200rpx;">
                        <view>{{avatarList[avatarSelected].name}}</view>
                    </picker>
                </view>
            </view>
        </form>
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
                // href: 'https://uniapp.dcloud.io/component/README?id=uniui',
                avatarList: [],
                avatarSelected: 0,
            }
        },
        methods: {
            async onShow() {
                await CoreEngine.init();
                this.avatarList = CoreEngine.avatar.getSortedAvatars();
                //this.testGanyu();
            },
            
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.avatarSelected = e.detail.value
            },

            testGanyu() {
                let ganyu = CoreEngine.avatar.avatars.get(10000037);
                let info = ganyu.newInfo();
                let weapon = CoreEngine.weapon.weapons.get(15502);
                info.weapon = weapon.newInfo();

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
                monster.props.addProp(PropType.IceSubHurt.by(-0.15)); //TODO 甘雨1命效果

                let ctx = new CalcContext();
                ctx.avatar = info;
                ctx.monster = monster;
                ctx.skillOption = ganyu.impl.getSkillOptions()[1]; //重击二段范围伤害
                let damage = ctx.calcDamage();
                console.log(`暴击伤害值: ${damage}`);
            }

        }
    }
</script>

<style>
</style>
