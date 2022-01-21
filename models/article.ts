import {Model, Sequelize, DataTypes, ModelCtor } from 'sequelize';
import {Column, DataType, Default, IsUUID, PrimaryKey, Table} from 'sequelize-typescript';

interface IArticleAttributes {
  id: number;
  title: string | null;
  body: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IArticleCreationAttributes {
  title: string | null;
  body: string | null;
}

@Table({
  timestamps: true,
})
export class Article extends Model<IArticleAttributes, IArticleCreationAttributes> {
  public title!: string | null;
  public body!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  public id!: string;

  public static associate(models: Record<string, ModelCtor<Model>>): void {
    Article.belongsTo(models.owners, {
      foreignKey: {
        name: 'ownerIdKey',
        field: 'owners_id',
      },
      as: 'owner',
    })
  }
}

export default function(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof Model {

  Article.init({
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new dataTypes.STRING(128),
      allowNull: true,
    },
    body: {
      type: new dataTypes.STRING(128),
      allowNull: true,
    },
  },{
    tableName: 'articles',
    underscored: true,
    modelName: 'articles',
    sequelize,
  });

  return Article;
}
