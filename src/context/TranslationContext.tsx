import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'tr';

interface Translations {
  [key: string]: {
    en: string;
    tr: string;
  };
}

const translations: Translations = {
  // Header
  'app.title': {
    en: 'Ultimate Pizza Dough Calculator',
    tr: 'Nihai Pizza Hamuru Hesaplayıcısı'
  },
  'app.footer': {
    en: 'Made with ❤️',
    tr: '❤️ ile Yapıldı'
  },
  
  // Measurement Units
  'units.title': {
    en: 'Measurement Units',
    tr: 'Ölçü Birimleri'
  },
  'units.centimeters': {
    en: 'Centimeters',
    tr: 'Santimetre'
  },
  'units.inches': {
    en: 'Inches',
    tr: 'İnç'
  },
  
  // Pizza Styles
  'style.title': {
    en: 'Pizza Style',
    tr: 'Pizza Stili'
  },
  'style.neapolitan': {
    en: 'Neapolitan',
    tr: 'Neapolitan'
  },
  'style.neapolitan.desc': {
    en: 'Traditional Italian style with a thin center and puffy, airy crust.',
    tr: 'İnce merkez ve kabarık, havadar kenar ile geleneksel İtalyan stili.'
  },
  'style.ny': {
    en: 'New York',
    tr: 'New York'
  },
  'style.ny.desc': {
    en: 'Thin, foldable slices with a crispy exterior and chewy interior.',
    tr: 'Çıtır dış ve çiğnenebilir iç yapıya sahip ince, katlanabilir dilimler.'
  },
  'style.newyork': {
    en: 'New York',
    tr: 'New York'
  },
  'style.newyork.desc': {
    en: 'Thin, foldable slices with a crispy exterior and chewy interior.',
    tr: 'Çıtır dış ve çiğnenebilir iç yapıya sahip ince, katlanabilir dilimler.'
  },
  'style.sicilian': {
    en: 'Sicilian',
    tr: 'Sicilian'
  },
  'style.sicilian.desc': {
    en: 'Thick, rectangular pizza with a fluffy, airy interior and crispy bottom.',
    tr: 'Kabarık, havadar iç yapı ve çıtır tabanıyla kalın, dikdörtgen pizza.'
  },
  'style.detroit': {
    en: 'Detroit',
    tr: 'Detroit'
  },
  'style.detroit.desc': {
    en: 'Rectangular pan pizza with a thick, airy crust and crispy cheese edges.',
    tr: 'Kalın, havadar hamur ve çıtır peynir kenarlarıyla dikdörtgen tava pizzası.'
  },
  'style.focaccia': {
    en: 'Focaccia',
    tr: 'Focaccia'
  },
  'style.focaccia.desc': {
    en: 'Italian flatbread with a high hydration for an open, airy crumb.',
    tr: 'Açık, havadar gözenek yapısı için yüksek hidrasyonlu İtalyan yufka ekmeği.'
  },
  'style.custom': {
    en: 'Custom',
    tr: 'Özel'
  },
  'style.custom.desc': {
    en: 'Create your own custom style with your preferred parameters.',
    tr: 'Tercih ettiğiniz parametrelerle kendi özel stilinizi oluşturun.'
  },
  
  // Form Labels
  'form.numberOfPizzas': {
    en: 'Number of Pizzas',
    tr: 'Pizza Sayısı'
  },
  'form.pizzaDiameter': {
    en: 'Pizza Diameter',
    tr: 'Pizza Çapı'
  },
  'form.thicknessFactor': {
    en: 'Thickness Factor',
    tr: 'Kalınlık Faktörü'
  },
  'form.hydration': {
    en: 'Hydration',
    tr: 'Hidrasyon'
  },
  'form.salt': {
    en: 'Salt',
    tr: 'Tuz'
  },
  'form.yeast': {
    en: 'Yeast',
    tr: 'Maya'
  },
  'form.yeastType': {
    en: 'Yeast Type',
    tr: 'Maya Tipi'
  },
  'form.fresh': {
    en: 'Fresh',
    tr: 'Taze'
  },
  'form.active': {
    en: 'Active Dry',
    tr: 'Aktif Kuru'
  },
  'form.instant': {
    en: 'Instant',
    tr: 'Instant'
  },
  'form.oil': {
    en: 'Oil',
    tr: 'Yağ'
  },
  'form.sugar': {
    en: 'Sugar',
    tr: 'Şeker'
  },
  'form.preferment': {
    en: 'Preferment',
    tr: 'Ön Maya'
  },
  'form.none': {
    en: 'None',
    tr: 'Yok'
  },
  'form.poolish': {
    en: 'Poolish',
    tr: 'Poolish'
  },
  'form.biga': {
    en: 'Biga',
    tr: 'Biga'
  },
  'form.shape': {
    en: 'Shape',
    tr: 'Şekil'
  },
  'form.round': {
    en: 'Round',
    tr: 'Yuvarlak'
  },
  'form.rectangular': {
    en: 'Rectangular',
    tr: 'Dikdörtgen'
  },
  'form.length': {
    en: 'Length',
    tr: 'Uzunluk'
  },
  'form.width': {
    en: 'Width',
    tr: 'Genişlik'
  },
  'form.diastaticMalt': {
    en: 'Diastatic Malt',
    tr: 'Diastatik Malt'
  },
  'form.doughBallWeight': {
    en: 'Dough Ball Weight',
    tr: 'Hamur Topu Ağırlığı'
  },
  'form.thin': {
    en: 'Thin',
    tr: 'İnce'
  },
  'form.thick': {
    en: 'Thick',
    tr: 'Kalın'
  },
  'form.prefermentPercentage': {
    en: 'Preferment Percentage',
    tr: 'Ön Maya Yüzdesi'
  },
  'form.prefermentHydration': {
    en: 'Preferment Hydration',
    tr: 'Ön Maya Hidrasyonu'
  },
  
  // Buttons
  'button.reset': {
    en: 'Reset to Defaults',
    tr: 'Varsayılanlara Dön'
  },
  'button.manageTemplates': {
    en: 'Manage Templates',
    tr: 'Şablonları Yönet'
  },
  'button.saveTemplate': {
    en: 'Save as Template',
    tr: 'Şablon Olarak Kaydet'
  },
  'button.applyTemplate': {
    en: 'Apply Template',
    tr: 'Şablonu Uygula'
  },
  
  // Recipe Display
  'recipe.title': {
    en: 'Pizza Dough Recipe',
    tr: 'Pizza Hamuru Tarifi'
  },
  'recipe.info': {
    en: 'Pizza Info',
    tr: 'Pizza Bilgisi'
  },
  'recipe.diameter': {
    en: 'diameter',
    tr: 'çap'
  },
  'recipe.thickness': {
    en: 'thickness',
    tr: 'kalınlık'
  },
  'recipe.ingredients': {
    en: 'Ingredients',
    tr: 'Malzemeler'
  },
  'recipe.ingredient': {
    en: 'Ingredient',
    tr: 'Malzeme'
  },
  'recipe.weight': {
    en: 'Weight',
    tr: 'Ağırlık'
  },
  'recipe.percentage': {
    en: "Baker's %",
    tr: "Fırıncı %'si"
  },
  'recipe.flour': {
    en: 'Flour',
    tr: 'Un'
  },
  'recipe.water': {
    en: 'Water',
    tr: 'Su'
  },
  'recipe.total': {
    en: 'Total Dough Weight',
    tr: 'Toplam Hamur Ağırlığı'
  },
  'recipe.perPizza': {
    en: 'Per Pizza',
    tr: 'Pizza Başına'
  },
  
  // Method
  'method.title': {
    en: 'Method',
    tr: 'Yöntem'
  },
  'method.step1': {
    en: 'Mix flour and water until combined. Let rest for 30 minutes (autolyse).',
    tr: 'Un ve suyu karıştırın. 30 dakika dinlendirin (otoliz).'
  },
  'method.step2': {
    en: 'Add salt and yeast. Knead until smooth and elastic.',
    tr: 'Tuz ve maya ekleyin. Pürüzsüz ve esnek olana kadar yoğurun.'
  },
  'method.step3': {
    en: 'Bulk fermentation at room temperature for 1-2 hours.',
    tr: 'Oda sıcaklığında 1-2 saat toplu fermantasyon.'
  },
  'method.step4': {
    en: 'Divide into portions and shape into balls.',
    tr: 'Parçalara bölün ve top şekline getirin.'
  },
  'method.step5': {
    en: 'Cold fermentation in refrigerator for 24-72 hours.',
    tr: 'Buzdolabında 24-72 saat soğuk fermantasyon.'
  },
  'method.step6': {
    en: 'Bring to room temperature 1-2 hours before use.',
    tr: 'Kullanmadan 1-2 saat önce oda sıcaklığına getirin.'
  },
  
  // Recipe sections
  'recipe.preferment': {
    en: 'Preferment',
    tr: 'Ön Maya'
  },
  'recipe.mainDough': {
    en: 'Main Dough',
    tr: 'Ana Hamur'
  },
  'recipe.totalWeight': {
    en: 'Total Dough Weight',
    tr: 'Toplam Hamur Ağırlığı'
  },
  'recipe.perPizzaWeight': {
    en: 'Per Pizza',
    tr: 'Pizza Başına'
  },
  
  // Ingredient names - these are used for dynamic ingredient display
  'ingredient.flour': {
    en: 'Flour',
    tr: 'Un'
  },
  'ingredient.water': {
    en: 'Water',
    tr: 'Su'
  },
  'ingredient.salt': {
    en: 'Salt',
    tr: 'Tuz'
  },
  'ingredient.yeast': {
    en: 'Yeast',
    tr: 'Maya'
  },
  'ingredient.oil': {
    en: 'Oil',
    tr: 'Yağ'
  },
  'ingredient.sugar': {
    en: 'Sugar',
    tr: 'Şeker'
  },
  'ingredient.preferment': {
    en: 'Preferment',
    tr: 'Ön Maya'
  },
  'ingredient.diastaticMalt': {
    en: 'Diastatic Malt',
    tr: 'Diastatik Malt'
  },
  'ingredient.doughEnhancer': {
    en: 'Dough Enhancer',
    tr: 'Hamur İyileştirici'
  },
  
  // Empty states and messages
  'empty.title': {
    en: 'No Recipe Yet',
    tr: 'Henüz Tarif Yok'
  },
  'empty.message': {
    en: 'Adjust your pizza settings to generate a customized dough recipe with precise measurements and step-by-step instructions.',
    tr: 'Özelleştirilmiş bir hamur tarifi oluşturmak için pizza ayarlarınızı düzenleyin.'
  },
  'loading.recipe': {
    en: 'Calculating your perfect recipe...',
    tr: 'Mükemmel tarifiniz hesaplanıyor...'
  },
  
  // Preferment section
  'preferment.title': {
    en: 'Preferment & Main Dough',
    tr: 'Ön Maya & Ana Hamur'
  },
  'preferment.info': {
    en: 'Prepare the preferment first and let it ferment before mixing with the main dough ingredients.',
    tr: 'Önce ön mayayı hazırlayın ve ana hamur malzemeleriyle karıştırmadan önce mayalanmasını bekleyin.'
  },
  'preferment.instructions': {
    en: 'Preferment Instructions',
    tr: 'Ön Maya Talimatları'
  },
  'mainDough.instructions': {
    en: 'Main Dough Instructions',
    tr: 'Ana Hamur Talimatları'
  },
  'dough.instructions': {
    en: 'Dough Instructions',
    tr: 'Hamur Talimatları'
  },
  'baking.instructions': {
    en: 'Baking Instructions',
    tr: 'Pişirme Talimatları'
  },
  
  // Method steps for preferment
  'preferment.step1': {
    en: 'Mix {flour}g ({flourOz}oz) flour with {water}g ({waterOz}oz) water{yeast} until no dry flour remains.',
    tr: '{flour}g ({flourOz}oz) unu {water}g ({waterOz}oz) su{yeast} ile kuru un kalmayana kadar karıştırın.'
  },
  'preferment.step1.yeast': {
    en: ' and {yeast}g ({yeastOz}oz) yeast',
    tr: ' ve {yeast}g ({yeastOz}oz) maya'
  },
  'preferment.step2.sponge': {
    en: 'Cover and let ferment at room temperature (68-72°F/20-22°C) for 3-5 hours.',
    tr: 'Kapatın ve oda sıcaklığında (20-22°C) 3-5 saat mayalanmaya bırakın.'
  },
  'preferment.step2.poolish': {
    en: 'Cover and let ferment at room temperature (68-72°F/20-22°C) for 12-16 hours.',
    tr: 'Kapatın ve oda sıcaklığında (20-22°C) 12-16 saat mayalanmaya bırakın.'
  },
  'preferment.step3.sponge': {
    en: 'The preferment is ready when it has a domed surface with many small bubbles.',
    tr: 'Ön maya, üzerinde birçok küçük kabarcık olan kubbeli bir yüzeye sahip olduğunda hazırdır.'
  },
  'preferment.step3.poolish': {
    en: 'The preferment is ready when it has doubled in size and has a domed or slightly collapsed surface with bubbles.',
    tr: 'Ön maya, boyutunun iki katına çıktığında ve üzerinde kabarcıklar olan kubbeli veya hafifçe çökmüş bir yüzeye sahip olduğunda hazırdır.'
  },
  
  // Main dough steps
  'mainDough.step1': {
    en: 'In a large bowl, combine the preferment with {water}g ({waterOz}oz) water and mix until the preferment is dissolved.',
    tr: 'Büyük bir kapta ön mayayı {water}g ({waterOz}oz) su ile karıştırın ve ön maya çözülene kadar karıştırmaya devam edin.'
  },
  'mainDough.step2': {
    en: 'Add {flour}g ({flourOz}oz) flour and mix until no dry flour remains. Cover and let rest for 30 minutes (autolyse).',
    tr: '{flour}g ({flourOz}oz) un ekleyin ve kuru un kalmayana kadar karıştırın. Kapatın ve 30 dakika dinlendirin (otoliz).'
  },
  'mainDough.step3.start': {
    en: 'Add {salt}g ({saltOz}oz) salt',
    tr: '{salt}g ({saltOz}oz) tuz ekleyin'
  },
  'mainDough.step3.yeast': {
    en: ', {yeast}g ({yeastOz}oz) yeast',
    tr: ', {yeast}g ({yeastOz}oz) maya'
  },
  'mainDough.step3.oil': {
    en: ', {oil}g ({oilOz}oz) oil',
    tr: ', {oil}g ({oilOz}oz) yağ'
  },
  'mainDough.step3.sugar': {
    en: ' and {sugar}g ({sugarOz}oz) sugar',
    tr: ' ve {sugar}g ({sugarOz}oz) şeker'
  },
  'mainDough.step3.malt': {
    en: ' and {malt}g ({maltOz}oz) diastatic malt',
    tr: ' ve {malt}g ({maltOz}oz) diastatik malt'
  },
  'mainDough.step3.enhancer': {
    en: ' and {enhancer}g ({enhancerOz}oz) dough enhancer',
    tr: ' ve {enhancer}g ({enhancerOz}oz) hamur iyileştirici'
  },
  'mainDough.step3.end': {
    en: ' and mix thoroughly.',
    tr: ' ekleyin ve iyice karıştırın.'
  },
  'mainDough.step4': {
    en: 'Perform 3-4 sets of stretch and folds at 30-minute intervals.',
    tr: '30 dakikalık aralıklarla 3-4 set germe ve katlama yapın.'
  },
  'mainDough.step5': {
    en: 'After the final fold, let the dough bulk ferment until it has increased in volume by about 50% (2-4 hours depending on temperature).',
    tr: 'Son katlamadan sonra, hamurun hacmi yaklaşık %50 artana kadar mayalanmaya bırakın (sıcaklığa bağlı olarak 2-4 saat).'
  },
  'mainDough.step6': {
    en: 'Divide the dough into individual balls and shape them.',
    tr: 'Hamuru tek tek toplar halinde bölün ve şekillendirin.'
  },
  'mainDough.step7': {
    en: 'Place the dough balls in containers and refrigerate for 24-72 hours for cold fermentation.',
    tr: 'Hamur toplarını kaplara yerleştirin ve soğuk fermantasyon için 24-72 saat buzdolabında bekletin.'
  },
  'mainDough.step8': {
    en: 'Remove from the refrigerator 1-2 hours before baking to allow the dough to warm up.',
    tr: 'Hamurun ısınması için pişirmeden 1-2 saat önce buzdolabından çıkarın.'
  },
  
  // Simple dough steps
  'dough.step1': {
    en: 'In a large bowl, combine {water}g ({waterOz}oz) water with {salt}g ({saltOz}oz) salt until dissolved.',
    tr: 'Büyük bir kapta {water}g ({waterOz}oz) suyu {salt}g ({saltOz}oz) tuz ile çözülene kadar karıştırın.'
  },
  'dough.step2': {
    en: 'Add {flour}g ({flourOz}oz) flour and mix until no dry flour remains.',
    tr: '{flour}g ({flourOz}oz) un ekleyin ve kuru un kalmayana kadar karıştırın.'
  },
  'dough.step3.yeast': {
    en: 'Add {yeast}g ({yeastOz}oz) {yeastName} and mix thoroughly.',
    tr: '{yeast}g ({yeastOz}oz) {yeastName} ekleyin ve iyice karıştırın.'
  },
  'dough.step3.oil': {
    en: 'Add {oil}g ({oilOz}oz) oil and mix thoroughly.',
    tr: '{oil}g ({oilOz}oz) yağ ekleyin ve iyice karıştırın.'
  },
  'dough.step3.sugar': {
    en: 'Add {sugar}g ({sugarOz}oz) sugar and mix thoroughly.',
    tr: '{sugar}g ({sugarOz}oz) şeker ekleyin ve iyice karıştırın.'
  },
  'dough.step3.malt': {
    en: 'Add {malt}g ({maltOz}oz) diastatic malt and mix thoroughly.',
    tr: '{malt}g ({maltOz}oz) diastatik malt ekleyin ve iyice karıştırın.'
  },
  'dough.step3.enhancer': {
    en: 'Add {enhancer}g ({enhancerOz}oz) dough enhancer and mix thoroughly.',
    tr: '{enhancer}g ({enhancerOz}oz) hamur iyileştirici ekleyin ve iyice karıştırın.'
  },
  'dough.step4': {
    en: 'Cover and let rest for 30 minutes (autolyse).',
    tr: 'Kapatın ve 30 dakika dinlendirin (otoliz).'
  },
  
  // Baking steps
  'baking.step1': {
    en: 'Preheat your oven to the highest temperature (ideally 500-550°F/260-290°C) with a pizza stone or steel for at least 1 hour.',
    tr: 'Fırınınızı en yüksek sıcaklığa (ideal olarak 260-290°C) ısıtın ve pizza taşı veya çeliğini en az 1 saat önceden ısıtın.'
  },
  'baking.step2': {
    en: 'Gently stretch the dough to your desired size without deflating it too much.',
    tr: 'Hamuru fazla havasını çıkarmadan nazikçe istediğiniz boyuta gerin.'
  },
  'baking.step3': {
    en: 'Add your toppings and transfer to the hot stone/steel.',
    tr: 'Malzemelerinizi ekleyin ve sıcak taş/çeliğe aktarın.'
  },
  'baking.step4': {
    en: 'Bake until the crust is golden and the cheese is bubbly (typically 5-8 minutes).',
    tr: 'Kenar altın rengi olana ve peynir köpürene kadar pişirin (genellikle 5-8 dakika).'
  },
  
  // Template Manager
  'template.manager': {
    en: 'Template Manager',
    tr: 'Şablon Yöneticisi'
  },
  'template.close': {
    en: 'Close',
    tr: 'Kapat'
  },
  'template.noTemplates': {
    en: 'No Templates Yet',
    tr: 'Henüz Şablon Yok'
  },
  'template.noTemplatesMessage': {
    en: 'Create custom pizza settings and save them as templates for quick access later.',
    tr: 'Özel pizza ayarları oluşturun ve daha sonra hızlı erişim için şablon olarak kaydedin.'
  },
  'template.saveCurrentSettings': {
    en: 'Save Current Settings',
    tr: 'Mevcut Ayarları Kaydet'
  },
  'template.apply': {
    en: 'Apply',
    tr: 'Uygula'
  },
  'template.delete': {
    en: 'Delete',
    tr: 'Sil'
  },
  'template.saveAsTemplate': {
    en: 'Save Current Settings as Template',
    tr: 'Mevcut Ayarları Şablon Olarak Kaydet'
  },
  'template.name': {
    en: 'Template Name',
    tr: 'Şablon Adı'
  },
  'template.placeholder': {
    en: 'E.g., My Favorite NY Style',
    tr: 'Örn., Favori NY Stilim'
  },
  'template.save': {
    en: 'Save Template',
    tr: 'Şablonu Kaydet'
  },
  'template.cancel': {
    en: 'Cancel',
    tr: 'İptal'
  },
  'template.errorName': {
    en: 'Please enter a template name',
    tr: 'Lütfen bir şablon adı girin'
  },
  'template.errorExists': {
    en: 'A template with this name already exists',
    tr: 'Bu isimde bir şablon zaten mevcut'
  },
  'template.saved': {
    en: 'Template "{name}" saved successfully!',
    tr: '"{name}" şablonu başarıyla kaydedildi!'
  },
  'template.applied': {
    en: 'Applied template "{name}"',
    tr: '"{name}" şablonu uygulandı'
  },
  'template.deleted': {
    en: 'Deleted template "{name}"',
    tr: '"{name}" şablonu silindi'
  },
  'template.created': {
    en: 'Created',
    tr: 'Oluşturuldu'
  },
  'template.rectangular': {
    en: 'Rectangular',
    tr: 'Dikdörtgen'
  },
  'template.round': {
    en: 'Round',
    tr: 'Yuvarlak'
  },
  'template.hydration': {
    en: 'hydration',
    tr: 'hidrasyon'
  }
};

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
