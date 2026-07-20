export abstract class BaseCrudService<TRepository> {

    protected readonly repository: TRepository;

    constructor(repository: TRepository) {

        this.repository = repository;

    }

}