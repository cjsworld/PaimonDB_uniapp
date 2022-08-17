import CoreEngine from '../CoreEngine';
import CoreEngineModule from '../CoreEngineModule';
import WeaponData from './WeaponData';

export default class WeaponModule implements CoreEngineModule {
    public weapons: Map<number, WeaponData> = new Map();

    async init(): Promise<void> {
        let config = await CoreEngine.readJsonResource("WeaponExcelConfigData");
        for (let item of config) {
            let weapon = new WeaponData(item);
            this.weapons.set(weapon.id, weapon);
        }
    }
}