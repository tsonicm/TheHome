const className = "text-lg p-1";
const selected = 'text-white bg-slate-400 rounded-lg';
const notSelected = 'text-black bg-white';

export function Navbar({currentPage}: {currentPage: string}) {

    return (
    <nav class="fixed bottom-[15px] left-0 right-0 mx-auto w-fit flex justify-center items-center px-4 py-2 bg-white shadow-md rounded-lg">
        <div class="flex items-center space-x-4">
            <a href="/" class={`${className} ${currentPage === '/' ? selected : notSelected}`} >Devices</a>
            <a href="/automate" class={`${className} ${currentPage === '/automate' ? selected : notSelected}`}>Automate</a>
        </div>
    </nav>
    );
}