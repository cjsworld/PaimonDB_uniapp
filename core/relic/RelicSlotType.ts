import PropType from '@/core/foundation/PropType';

/**
 * 圣遗物槽位类型
 */
export default class RelicSlotType {
    static All: RelicSlotType[] = [];
    
    static Flower = new RelicSlotType(0, "生之花", 4000);
    static Leather = new RelicSlotType(1, "死之羽", 2000);
    static Sand = new RelicSlotType(2, "时之沙", 1000);
    static Cup = new RelicSlotType(3, "空之杯", 5000);
    static Cap = new RelicSlotType(4, "理之冠", 3000);
    
    static getByIndex(index: number): RelicSlotType {
        var t = RelicSlotType.All.find(e => e.index == index);
        if (t == null) {
            throw new Error(`Unknown relic index: ${index}`);
        }
        return t;
    }
    
    static getByMainDepotId(mainDepotId: number): RelicSlotType | undefined {
        return RelicSlotType.All.find(e => e.mainDepotId == mainDepotId);
    }
    
    /**
     * 序号
     */
    index: number;
    
    /**
     * 描述
     */
    desc: string;
    
    /**
     * 主属性词条集合id
     */
    mainDepotId: number;
    
    mainPropTypes = new Array<PropType>();
    
    private constructor(index: number, desc: string, mainDepotId: number) {
        RelicSlotType.All.push(this);
        this.index = index;
        this.desc = desc;
        this.mainDepotId = mainDepotId;
    }
    
    toString(): string {
        return this.desc;
    }
}