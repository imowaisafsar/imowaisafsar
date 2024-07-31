import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSourceLang, selectSourceLang, selectSearch} from "@/redux/reducers/translateSlice";
import LanguageMenu from "@/components/translate/LanguageMenu";
import LanguageMenuItem from "@/components/translate/LanguageMenuItem";
import {languages} from "@/data/languages";

const SourceLanguageSelector = () => {
    const search = useSelector(selectSearch);
    const sourceLanguage = useSelector(selectSourceLang);
    const dispatch = useDispatch();
    return (
        <LanguageMenu active={sourceLanguage}>
            <LanguageMenuItem
                active={sourceLanguage === "auto"}
                onClick={() => dispatch(setSourceLang("auto"))}
            >
                Auto Detect
            </LanguageMenuItem>

            {
                languages
                    .filter(
                        (language) => language.name.toLowerCase().startsWith(search.toLowerCase())
                    )
                    .map((language) => (
                        <LanguageMenuItem
                            key={language.code}
                            active={sourceLanguage === language.code}
                            onClick={() => dispatch(setSourceLang(language.code))}
                        >
                            {language.name}
                        </LanguageMenuItem>
                    ))
            }
        </LanguageMenu>
    );
};

export default SourceLanguageSelector;
