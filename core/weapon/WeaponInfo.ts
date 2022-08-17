import PropPanel from '@/core/foundation/PropPanel';
import AffixData from '../affix/AffixData';
import WeaponData from './WeaponData';

/**
 * 武器信息
 */
export default class WeaponInfo {
    /**
     * 武器数据
     */
    data: WeaponData;
    
    /**
     * 等级
     */
    level: number;
    
    /**
     * 是否已突破（用于在处于突破等级时区分当前是否已突破）
     */
    promoted: boolean;
    
    /**
     * 精练等级，初始为1
     */
    refine: number;
    
    constructor(data: WeaponData) {
        this.data = data;
        this.level = 90;
        this.promoted = false;
        this.refine = 1;
    }
    
    setLevel(level: number, promoted: boolean) {
        this.level = level;
        this.promoted = promoted;
    }
    
    getBasePanel(): PropPanel {
        let panel = this.data.getBasePanelAt(this.level, this.promoted);
        let affix = this.getAffix();
        if (affix) {
            panel.addPanel(affix.addProps);
        }
        return panel;
    }
    
    getAffix(): AffixData | null {
        if (!this.data.affix) {
            return null;
        } else {
            return this.data.affix.levels.get(this.refine - 1) as AffixData;
        }
    }
}