import { token } from '@/components/esig/Navbar/Currencies';
import _request from '@/request';
import { useState, useEffect } from 'react';
import { IOptions } from '../components/Select';

export type OptionList = {
  BusinessSizeType: IOptions[];
  LegalFormType: IOptions[];
  SectorType: IOptions[];
  OwnershipType: IOptions[];
};

let cachedOptionsList: OptionList | undefined;

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [optionsList, setOptionsList] = useState<OptionList>({
    BusinessSizeType: [],
    LegalFormType: [],
    SectorType: [],
    OwnershipType: [],
  });

  useEffect(() => {
    if (cachedOptionsList) {
      setOptionsList(cachedOptionsList)
      return;
    };

    getOptionsList();
  }, []);


  const enumService = async (endpoint: string) => {
    return await _request(`/enum/${endpoint}`, token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const getOptionsList = async () => {
    try {
      setLoading(true);
      const pendingPromises = [];

      for (const key in optionsList) {
        pendingPromises.push(
          enumService(`Organization${key}`)
        );
      }
      const [BusinessSizeType, LegalFormType, SectorType, OwnershipType] = await Promise.all(pendingPromises);

      const optionsObject = {
        BusinessSizeType,
        LegalFormType,
        SectorType,
        OwnershipType
      } as OptionList

      cachedOptionsList = optionsObject

      setOptionsList(optionsObject);
    } finally {
      setLoading(false);
    }
  };

  return { optionsList, loading };
};
