import PropPanel from '@/core/foundation/PropPanel';
import PropType from '@/core/foundation/PropType';

/**
 * 突破等级配置数据
 */
export default class PromiteLevelData {
    /**
     * 突破等级
     */
    level: number;
    
    /**
     * 解锁等级上限
     */
    unlockMaxLevel: number;
    
    /**
     * 增加属性
     */
    addProps: PropPanel;
    
    constructor(data: any) {
        this.level = data.promoteLevel;
        this.unlockMaxLevel = data.unlockMaxLevel;
        this.addProps = new PropPanel();
        for (let item of data.addProps) {
            let type = PropType.getByConfigName(item.propType);
            let value = data.value ?? 0;
            if (value > 0) {
                this.addProps.addProp(type.by(value));
            }
        }
    }
}