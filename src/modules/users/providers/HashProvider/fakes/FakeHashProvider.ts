import IHashProvider from '../models/IHasProvider';

export default class FakeHashProvider implements IHashProvider {
    public async generatehash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        return payload === hashed;
    }
}