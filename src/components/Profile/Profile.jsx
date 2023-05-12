import Layout from 'components/Layout/Layout';
import Field from './components/Field/Field';

const Profile = () => {
  return (
    <Layout>
      <div className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__form">
          <Field name={'Имя'} value={'Виталий'} border />
          <Field name={'E-mail'} value={'pochta@yandex.ru'} />
        </div>
        <div className="profile__buttons">
          <p className="profile__edit-btn">Редактировать</p>
          <p className="profile__exit-btn">Выйти из аккаунта</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
