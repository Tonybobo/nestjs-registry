"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const class_validator_1 = require("class-validator");
class BaseRepository {
    constructor(repository) {
        this._repository = repository;
    }
    findAll(query) {
        return this._repository.find(query);
    }
    findOne(query) {
        return this._repository.findOne(query);
    }
    save(entities, options) {
        if ((0, class_validator_1.isArray)(entities)) {
            return this._repository.save(entities, options);
        }
        return this._repository.save(entities, options);
    }
    delete(query) {
        return this._repository.softDelete(query);
    }
    findOneBy(where) {
        return this._repository.findOneBy(where);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.js.map