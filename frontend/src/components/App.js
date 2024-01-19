import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; 
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import '../pages/index.css';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import auth from "../utils/AuthApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import green from "../images/True.svg";
import red from "../images/False.svg";

function App() {

    const [currentUser, setCurrentUser] = React.useState({
        "name": '',
        "about": '',
        "avatar": '',
        "_id": '',
        "cohort": ''
      });
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [infoImage, setInfoImage] = React.useState("");
    const [infoText, setInfoText] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([
                api.getAllCards(),
                api.getProfileInformation()])
                    .then(([initialCard, res]) => {
                        setCards(initialCard);
                        setCurrentUser(res);
                    })
                    .catch((err) => {
                        console.log(err); 
                    });
        }
    }, [loggedIn]);

    function handleUpdateUser(userInfo) {
        api.changeProfileInformation(userInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleAddPlaceSubmit(place) {
        api.addNewCard(place)
            .then((newPlace) => {
                setCards((cards) => [newPlace, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function onRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setInfoImage(green);
                setInfoText("Вы успешно зарегистрировались!");
                handleInfoTooltip();
                navigate("/sign-in");
            })
            .catch(() => {
                setInfoImage(red);
                setInfoText("Что-то пошло не так! Попробуйте ещё раз.");
                handleInfoTooltip();
            })
    }

    function onLogin(email, password) {
        auth.login(email, password)
            .then((response) => {
                localStorage.setItem("jwt", response.token);
                setAddress(email);
                setLoggedIn(true);
                navigate("/");
            })
            .catch(() => {
                setInfoImage(red);
                setInfoText("Что-то пошло не так! Попробуйте ещё раз.");
                handleInfoTooltip();
            })
    }

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
    
        if (jwt) {
          auth.getToken(jwt)
            .then((response) => {
                setLoggedIn(true);
                setAddress(response.data.email);
            })
            .catch((err) => {
                console.log(err); 
            });
        }
      }, []);
    
    React.useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    function onSignOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        setAddress("");
        navigate("/sign-in");
    }

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPopupOpen(true);
    }
    
    function handleInfoTooltip() {
        setInfoTooltipOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setAvatarPopupOpen(false);
        setEditPopupOpen(false);
        setAddPopupOpen(false);
        setInfoTooltipOpen(false);
        setSelectedCard(null);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
            <div className="page">
                <Routes>
                    <Route exact path="/" element={
                        <div className="main__container">
                            <Header route="" title="Выйти" mail={address} onSignOut={onSignOut}/>
                            <ProtectedRoute 
                            component={Main} 
                            loggedIn={loggedIn}
                            cards={cards} 
                            onEditAvatar={handleEditAvatarClick} 
                            onEditProfile={handleEditProfileClick} 
                            onAddPlace={handleAddPlaceClick} 
                            onCardClick={handleCardClick} 
                            onCardLike={handleCardLike} 
                            onCardDelete={handleCardDelete} />
                            <Footer />
                        </div>} />
                    <Route path="/sign-up" element={
                        <>
                            <Header route="/sign-in" title="Войти"/>
                            <Register onRegister={onRegister}/>
                        </>
                        } />
                    <Route path="/sign-in" element={
                        <>
                            <Header route="/sign-up" title="Регистрация"/>
                            <Login onLogin={onLogin}/>
                        </>
                        } />
                    <Route path="*" element={
                        loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace/>
                    } />
                </Routes>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
                <InfoTooltip isOpen={isInfoTooltipOpen} icon={infoImage} title={infoText} onClose={closeAllPopups}></InfoTooltip>
            </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
