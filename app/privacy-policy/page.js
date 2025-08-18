import { getFirstExistingPageBySlugs } from "../../services/pages";

export async function generateMetadata() {
  const page = await getFirstExistingPageBySlugs([
    "privacy-policy",
    "privacy",
    "политика-за-поверителност",
  ]);
  const meta = page?.yoast_head_json;
  const title = meta?.title || "Политика за поверителност - OnlineInsurance.bg";
  const description = meta?.description || meta?.og_description || "";
  const ogImage = meta?.og_image?.[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: meta?.canonical || "/privacy-policy",
    },
    openGraph: {
      title: meta?.og_title || title,
      description: meta?.og_description || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">
        Политика за поверителност
      </h1>
      <p className="mb-4 text-gray-700">
        Настоящата Политика за поверителност описва как OnlineInsurance.bg
        събира, използва и защитава личните данни на потребителите на нашия
        уебсайт.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900">
        1. Събиране на лични данни
      </h2>
      <p className="text-gray-700">
        Ние събираме следните категории лични данни, предоставени доброволно от
        вас:
      </p>
      <ul className="list-disc pl-5 text-gray-700 mt-2">
        <li>Име и фамилия</li>
        <li>Имейл адрес (при абонамент за бюлетин)</li>
        <li>Телефонен номер (при попълване на контактната форма)</li>
        <li>Съобщения и запитвания, изпратени чрез формата за контакт</li>
        <li>IP адрес и данни за използване на уебсайта (чрез бисквитки)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900">
        2. Цели на обработката
      </h2>
      <p className="text-gray-700">
        Ние обработваме вашите лични данни за следните цели:
      </p>
      <ul className="list-disc pl-5 text-gray-700 mt-2">
        <li>Отговор на запитвания и предоставяне на услуги</li>
        <li>Изпращане на бюлетини и правна информация</li>
        <li>Анализ и подобряване на потребителското изживяване</li>
        <li>Съобразяване със законовите изисквания</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900">
        3. Съхранение и защита на личните данни
      </h2>
      <p className="text-gray-700">
        Личните данни се съхраняват на защитени сървъри и достъпът до тях е
        ограничен само до оправомощени лица. Ние не предоставяме вашите данни на
        трети страни без вашето изрично съгласие, освен ако това не се изисква
        по закон.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900">
        4. Бисквитки
      </h2>
      <p className="text-gray-700">
        Нашият уебсайт използва бисквитки за подобряване на потребителското
        изживяване. Можете да откажете или управлявате използването на бисквитки
        чрез настройките на вашия браузър.
      </p>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900">
        5. Вашите права
      </h2>
      <p className="text-gray-700">
        Според Общия регламент за защита на данните (GDPR) вие имате следните
        права:
      </p>
      <ul className="list-disc pl-5 text-gray-700 mt-2">
        <li>Право на достъп до вашите лични данни</li>
        <li>Право на коригиране на неточни данни</li>
        <li>Право на изтриване ("правото да бъдеш забравен")</li>
        <li>Право на възражение срещу обработката</li>
        <li>Право на преносимост на данните</li>
      </ul>
    </div>
  );
}
