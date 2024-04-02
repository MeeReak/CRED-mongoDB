import tokenModel from "../models/tokenModel";

export class TokenRepo {
  async createTokenId(id: string, token: string) {
    try {
      return tokenModel.create(id, token);
    } catch (error) {
      throw error;
    }
  }

  async findToken(token: string) {
    try {
      return await tokenModel.findOne({ token: token });
    } catch (error) {
      throw error;
    }
  }

  async deleteToken(token: string) {
    try {
      return await tokenModel.deleteOne({ token: token });
    } catch (error) {
      throw error;
    }
  }
}
