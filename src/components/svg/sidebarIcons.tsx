
interface IProps {
    color?: boolean
}

export const SidebarHomeIcon = ({ color }: IProps) => (
    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1151 0.753865C11.9746 0.748712 11.834 0.748712 11.6935 0.753865C10.7661 0.787886 9.93106 1.10323 9.01545 1.62818C8.12318 2.13974 7.09594 2.88608 5.79256 3.83305L5.72171 3.88453C4.41831 4.83149 3.39105 5.57783 2.6288 6.26835C1.84662 6.97693 1.28865 7.67368 0.969719 8.54515C0.921406 8.67717 0.87795 8.81091 0.83944 8.94611C0.58522 9.83861 0.627082 10.7303 0.843393 11.7633C1.05419 12.77 1.44657 13.9775 1.94442 15.5098L3.67899 20.8482C4.05285 21.9988 5.1251 22.7779 6.33495 22.7779C7.87728 22.7779 9.12759 21.5276 9.12759 19.9852V17.2363C9.12759 16.592 9.64991 16.0697 10.2942 16.0697H13.5144C14.1587 16.0697 14.681 16.592 14.681 17.2363V19.9852C14.681 21.5276 15.9313 22.7779 17.4737 22.7779C18.6835 22.7779 19.7558 21.9988 20.1296 20.8482L21.8642 15.5097C22.362 13.9775 22.7544 12.7699 22.9652 11.7633C23.1815 10.7303 23.2234 9.83861 22.9692 8.94611C22.9307 8.81091 22.8872 8.67717 22.8389 8.54515C22.52 7.67368 21.962 6.97693 21.1798 6.26835C20.4175 5.57782 19.3903 4.83149 18.0869 3.88452L18.016 3.83303C16.7127 2.88607 15.6854 2.13973 14.7932 1.62818C13.8775 1.10323 13.0425 0.787886 12.1151 0.753865ZM11.7485 2.25286C11.8523 2.24905 11.9563 2.24905 12.0601 2.25286C12.6555 2.2747 13.2486 2.47167 14.0471 2.92948C14.8609 3.39603 15.8232 4.09396 17.1698 5.07232C18.5164 6.05068 19.4776 6.75026 20.1727 7.38002C20.8549 7.99798 21.2255 8.50112 21.4303 9.06067C21.466 9.15824 21.4981 9.25709 21.5265 9.35703C21.6898 9.93007 21.6857 10.555 21.4971 11.4558C21.3048 12.374 20.9384 13.5049 20.4241 15.0879L18.703 20.3847C18.53 20.9173 18.0337 21.2779 17.4737 21.2779C16.7598 21.2779 16.181 20.6991 16.181 19.9852V17.2363C16.181 15.7636 14.9871 14.5697 13.5144 14.5697H10.2942C8.82148 14.5697 7.62759 15.7636 7.62759 17.2363V19.9852C7.62759 20.6991 7.04886 21.2779 6.33495 21.2779C5.77494 21.2779 5.27862 20.9173 5.10557 20.3847L3.38455 15.0879C2.87019 13.5049 2.5038 12.374 2.31155 11.4558C2.12291 10.555 2.11883 9.93007 2.28206 9.35703C2.31052 9.2571 2.34264 9.15824 2.37835 9.06067C2.58313 8.50112 2.95372 7.99798 3.63586 7.38002C4.33105 6.75026 5.29221 6.05068 6.6388 5.07232C7.9854 4.09396 8.94775 3.39603 9.76152 2.92948C10.56 2.47167 11.1531 2.2747 11.7485 2.25286Z" fill={color ? "#233DF3" : "#626262"} />
    </svg>
);

export const SidebarSearchIcon = ({ color }: IProps) => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3043 0.5C5.56053 0.5 0.904297 5.15623 0.904297 10.9C0.904297 16.6437 5.56053 21.3 11.3043 21.3C17.048 21.3 21.7043 16.6437 21.7043 10.9C21.7043 5.15623 17.048 0.5 11.3043 0.5ZM2.50429 10.9C2.50429 6.03989 6.44418 2.1 11.3043 2.1C16.1644 2.1 20.1043 6.03989 20.1043 10.9C20.1043 15.7601 16.1644 19.7 11.3043 19.7C6.44418 19.7 2.50429 15.7601 2.50429 10.9Z" fill={color ? "#233DF3" : "#626262"} />
        <path d="M20.4034 18.8677C20.0909 18.5553 19.5844 18.5553 19.272 18.8677C18.9596 19.1801 18.9596 19.6867 19.272 19.9991L23.5385 24.2657C23.8509 24.5781 24.3575 24.5781 24.6699 24.2657C24.9823 23.9533 24.9823 23.4467 24.6699 23.1343L20.4034 18.8677Z" fill={color ? "#233DF3" : "#626262"} />
    </svg>
);

export const SidebarCalendarIcon = ({ color }: IProps) => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5706 10.4043H3.74658C3.33258 10.4043 2.99658 10.0683 2.99658 9.6543C2.99658 9.2403 3.33258 8.9043 3.74658 8.9043H21.5706C21.9846 8.9043 22.3206 9.2403 22.3206 9.6543C22.3206 10.0683 21.9846 10.4043 21.5706 10.4043Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1056 14.3096C16.6916 14.3096 16.3516 13.9736 16.3516 13.5596C16.3516 13.1456 16.6826 12.8096 17.0966 12.8096H17.1056C17.5196 12.8096 17.8556 13.1456 17.8556 13.5596C17.8556 13.9736 17.5196 14.3096 17.1056 14.3096Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6681 14.3096C12.2541 14.3096 11.9141 13.9736 11.9141 13.5596C11.9141 13.1456 12.2451 12.8096 12.6591 12.8096H12.6681C13.0821 12.8096 13.4181 13.1456 13.4181 13.5596C13.4181 13.9736 13.0821 14.3096 12.6681 14.3096Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22131 14.3096C7.80731 14.3096 7.46631 13.9736 7.46631 13.5596C7.46631 13.1456 7.79831 12.8096 8.21231 12.8096H8.22131C8.63531 12.8096 8.97131 13.1456 8.97131 13.5596C8.97131 13.9736 8.63531 14.3096 8.22131 14.3096Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1056 18.1963C16.6916 18.1963 16.3516 17.8603 16.3516 17.4463C16.3516 17.0323 16.6826 16.6963 17.0966 16.6963H17.1056C17.5196 16.6963 17.8556 17.0323 17.8556 17.4463C17.8556 17.8603 17.5196 18.1963 17.1056 18.1963Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6681 18.1963C12.2541 18.1963 11.9141 17.8603 11.9141 17.4463C11.9141 17.0323 12.2451 16.6963 12.6591 16.6963H12.6681C13.0821 16.6963 13.4181 17.0323 13.4181 17.4463C13.4181 17.8603 13.0821 18.1963 12.6681 18.1963Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22131 18.1963C7.80731 18.1963 7.46631 17.8603 7.46631 17.4463C7.46631 17.0323 7.79831 16.6963 8.21231 16.6963H8.22131C8.63531 16.6963 8.97131 17.0323 8.97131 17.4463C8.97131 17.8603 8.63531 18.1963 8.22131 18.1963Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6978 6.291C16.2838 6.291 15.9478 5.955 15.9478 5.541V2.25C15.9478 1.836 16.2838 1.5 16.6978 1.5C17.1118 1.5 17.4478 1.836 17.4478 2.25V5.541C17.4478 5.955 17.1118 6.291 16.6978 6.291Z" fill={color ? "#233DF3" : "#626262"} />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.61963 6.291C8.20563 6.291 7.86963 5.955 7.86963 5.541V2.25C7.86963 1.836 8.20563 1.5 8.61963 1.5C9.03363 1.5 9.36963 1.836 9.36963 2.25V5.541C9.36963 5.955 9.03363 6.291 8.61963 6.291Z" fill={color ? "#233DF3" : "#626262"} />
        <mask id="mask0_6702_8835" maskUnits="userSpaceOnUse" x="2" y="3" width="21" height="20">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.9043 3.0791H22.4043V23H2.9043V3.0791Z" fill="white" />
        </mask>
        <g mask="url(#mask0_6702_8835)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4253 4.5791C5.8323 4.5791 4.4043 5.9621 4.4043 8.4731V17.5221C4.4043 20.0881 5.8323 21.5001 8.4253 21.5001H16.8833C19.4763 21.5001 20.9043 20.1141 20.9043 17.5981V8.4731C20.9083 7.2381 20.5763 6.2781 19.9173 5.6181C19.2393 4.9381 18.1943 4.5791 16.8923 4.5791H8.4253ZM16.8833 23.0001H8.4253C5.0203 23.0001 2.9043 20.9011 2.9043 17.5221V8.4731C2.9043 5.1451 5.0203 3.0791 8.4253 3.0791H16.8923C18.6013 3.0791 20.0143 3.5911 20.9793 4.5581C21.9163 5.4991 22.4093 6.8521 22.4043 8.4751V17.5981C22.4043 20.9301 20.2883 23.0001 16.8833 23.0001Z" fill={color ? "#233DF3" : "#626262"} />
        </g>
    </svg>
);

export const SidebarMessageIcon = ({ color }: IProps) => (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.98747 16.3332H7.5708C4.23747 16.3332 2.5708 15.4998 2.5708 11.3332V7.1665C2.5708 3.83317 4.23747 2.1665 7.5708 2.1665H14.2375C17.5708 2.1665 19.2375 3.83317 19.2375 7.1665V11.3332C19.2375 14.6665 17.5708 16.3332 14.2375 16.3332H13.8208C13.5625 16.3332 13.3125 16.4582 13.1541 16.6665L11.9041 18.3332C11.3541 19.0665 10.4541 19.0665 9.90413 18.3332L8.65413 16.6665C8.5208 16.4832 8.21247 16.3332 7.98747 16.3332Z" stroke={color ? "#233DF3" : "#626262"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.2348 9.66667H14.2423" stroke={color ? "#233DF3" : "#626262"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.9004 9.66667H10.9079" stroke={color ? "#233DF3" : "#626262"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7.56639 9.66667H7.57387" stroke={color ? "#233DF3" : "#626262"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

export const SidebarEventIcon = ({ color }: IProps) => (
    <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.72088 4.59274C8.72088 4.97701 8.4107 5.28889 8.02852 5.28889C7.64634 5.28889 7.33616 4.97701 7.33616 4.59274C7.33616 2.05968 9.38554 0 11.9048 0C14.4231 0 16.4725 2.05968 16.4725 4.59274C16.4725 7.1258 14.4231 9.18548 11.9048 9.18548C10.8737 9.18548 9.90158 8.85225 9.09475 8.22108C8.79289 7.98531 8.73842 7.54813 8.9729 7.24461C9.20645 6.94016 9.6431 6.88632 9.94497 7.12301C10.5062 7.56112 11.1838 7.79318 11.9048 7.79318C13.6606 7.79318 15.0878 6.35725 15.0878 4.59274C15.0878 2.82823 13.6606 1.3923 11.9048 1.3923C10.149 1.3923 8.72088 2.82823 8.72088 4.59274ZM6.925 7.4852C6.925 7.86947 6.61482 8.18135 6.23264 8.18135C4.23957 8.18135 2.61761 6.55143 2.61761 4.54744C2.61761 2.54346 4.23957 0.912607 6.23264 0.912607C6.61482 0.912607 6.925 1.22448 6.925 1.60876C6.925 1.99303 6.61482 2.30491 6.23264 2.30491C5.00301 2.30491 4.00232 3.31108 4.00232 4.54744C4.00232 5.78381 5.00301 6.78905 6.23264 6.78905C6.61482 6.78905 6.925 7.10092 6.925 7.4852ZM4.93544 11.372C4.49048 11.4017 4.04368 11.4676 3.60703 11.566C2.93683 11.6988 2.47618 11.9252 2.35709 12.1759C2.26755 12.3661 2.26755 12.5861 2.35709 12.7764C2.41433 12.8961 2.64696 13.1941 3.59503 13.3899C3.96983 13.467 4.21077 13.8346 4.13415 14.2114C4.06768 14.5409 3.77874 14.7674 3.45656 14.7674C3.4104 14.7674 3.36424 14.7628 3.31716 14.7535C2.17154 14.5177 1.42841 14.0536 1.10716 13.3742C0.836677 12.8033 0.836677 12.1489 1.10716 11.5781C1.4321 10.8922 2.17708 10.429 3.32178 10.2025C3.81012 10.093 4.32801 10.0178 4.8422 9.98345C5.21146 9.95468 5.55394 10.2471 5.57979 10.6304C5.60564 11.0147 5.31762 11.347 4.93544 11.372ZM17.5876 6.8117C17.2054 6.8117 16.8952 7.12357 16.8952 7.50785C16.8952 7.89212 17.2054 8.204 17.5876 8.204C19.576 8.204 21.1943 6.57686 21.1943 4.57752C21.1943 2.57724 19.576 0.951035 17.5876 0.951035C17.2054 0.951035 16.8952 1.26198 16.8952 1.64719C16.8952 2.03146 17.2054 2.34334 17.5876 2.34334C18.8126 2.34334 19.8096 3.34579 19.8096 4.57752C19.8096 5.80924 18.8126 6.8117 17.5876 6.8117ZM20.5071 10.2196C21.6343 10.4442 22.3774 10.9055 22.7014 11.5878C22.9719 12.1586 22.9719 12.812 22.7014 13.3829C22.3811 14.0596 21.6398 14.5227 20.496 14.7594C20.4499 14.7696 20.4028 14.7743 20.3557 14.7743C20.0345 14.7743 19.7465 14.5469 19.6791 14.2183C19.6024 13.8414 19.8434 13.4729 20.2182 13.3959C21.1626 13.2 21.3952 12.903 21.4515 12.7842C21.541 12.5949 21.541 12.3767 21.4515 12.1874C21.3333 11.9377 20.8745 11.7121 20.2228 11.5822C19.7695 11.4819 19.3227 11.416 18.8815 11.3863C18.4993 11.3613 18.2113 11.028 18.2371 10.6447C18.262 10.2614 18.5953 9.97732 18.9738 9.99774C19.4861 10.0321 20.0012 10.1073 20.5071 10.2196ZM11.9045 10.626C10.2373 10.626 5.16465 10.626 5.16465 13.8218C5.16465 14.5431 5.44713 15.5418 6.79308 16.2055C7.20665 16.4078 7.70699 16.573 8.28119 16.6965C8.65321 16.78 9.02247 16.5368 9.10186 16.1609C9.18218 15.785 8.94308 15.4146 8.56921 15.3348C8.10579 15.2355 7.71253 15.1074 7.40235 14.9542C6.6463 14.582 6.54937 14.1541 6.54937 13.8218C6.54937 12.3311 9.46189 12.0183 11.9045 12.0183C15.4586 12.0183 17.2597 12.6189 17.2597 13.8051C17.2597 15.2949 14.3472 15.6077 11.9045 15.6077C11.5223 15.6077 11.2122 15.9196 11.2122 16.3038C11.2122 16.6881 11.5223 17 11.9045 17C13.5717 17 18.6444 17 18.6444 13.8051C18.6444 10.626 13.748 10.626 11.9045 10.626Z" fill={color ? "#233DF3" : "#626262"} />
    </svg>
);

export const SidebarNotificationIcon = ({ color }: IProps) => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22852 19.606C8.74652 20.183 9.41152 20.5 10.1015 20.5H10.1025C10.7955 20.5 11.4635 20.183 11.9825 19.605C12.2605 19.298 12.7345 19.273 13.0415 19.55C13.3495 19.827 13.3745 20.302 13.0975 20.609C12.2895 21.506 11.2265 22 10.1025 22H10.1005C8.97952 21.999 7.91852 21.505 7.11352 20.608C6.83652 20.301 6.86152 19.826 7.16952 19.55C7.47752 19.272 7.95152 19.297 8.22852 19.606ZM10.1513 0.5C14.5963 0.5 17.5823 3.962 17.5823 7.195C17.5823 8.858 18.0053 9.563 18.4543 10.311C18.8983 11.049 19.4013 11.887 19.4013 13.471C19.0523 17.518 14.8273 17.848 10.1513 17.848C5.47532 17.848 1.24932 17.518 0.90431 13.535C0.901323 11.887 1.40432 11.049 1.84832 10.311L2.00507 10.0472C2.391 9.38386 2.72032 8.66235 2.72032 7.195C2.72032 3.962 5.70632 0.5 10.1513 0.5ZM10.1513 2C6.65632 2 4.22032 4.738 4.22032 7.195C4.22032 9.274 3.64332 10.235 3.13332 11.083C2.72432 11.764 2.40132 12.302 2.40132 13.471C2.56832 15.357 3.81332 16.348 10.1513 16.348C16.4543 16.348 17.7383 15.313 17.9043 13.406C17.9013 12.302 17.5783 11.764 17.1693 11.083C16.6593 10.235 16.0823 9.274 16.0823 7.195C16.0823 4.738 13.6463 2 10.1513 2Z" fill={color ? "#233DF3" : "#626262"} />
    </svg>
);

export const SidebarProfileIcon = ({ color }: IProps) => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0245 13.2805C12.9545 13.2705 12.8645 13.2705 12.7845 13.2805C11.0245 13.2205 9.62451 11.7805 9.62451 10.0105C9.62451 8.20047 11.0845 6.73047 12.9045 6.73047C14.7145 6.73047 16.1845 8.20047 16.1845 10.0105C16.1745 11.7805 14.7845 13.2205 13.0245 13.2805Z" stroke={color ? "#233DF3" : "#626262"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19.6446 19.8796C17.8646 21.5096 15.5046 22.4996 12.9046 22.4996C10.3046 22.4996 7.94455 21.5096 6.16455 19.8796C6.26455 18.9396 6.86455 18.0196 7.93455 17.2996C10.6746 15.4796 15.1545 15.4796 17.8745 17.2996C18.9445 18.0196 19.5446 18.9396 19.6446 19.8796Z" stroke={color ? "#233DF3" : "#626262"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12.9043 22.5C18.4271 22.5 22.9043 18.0228 22.9043 12.5C22.9043 6.97715 18.4271 2.5 12.9043 2.5C7.38145 2.5 2.9043 6.97715 2.9043 12.5C2.9043 18.0228 7.38145 22.5 12.9043 22.5Z" stroke={color ? "#233DF3" : "#626262"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

export const SidebarWalletIcon = ({ color }: IProps) => (
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.29195 20.7632L3.68383 20.1237L3.29195 20.7632ZM1.64125 19.1125L2.28073 18.7206H2.28073L1.64125 19.1125ZM20.1676 19.1125L19.5282 18.7206L20.1676 19.1125ZM18.5169 20.7632L18.1251 20.1237L18.5169 20.7632ZM18.5169 5.2368L18.1251 5.87628L18.5169 5.2368ZM20.1676 6.88751L19.5282 7.27938L20.1676 6.88751ZM3.29195 5.2368L3.68383 5.87628H3.68383L3.29195 5.2368ZM1.64125 6.88751L2.28073 7.27938H2.28073L1.64125 6.88751ZM17.3812 2.04645L17.9225 1.52728V1.52728L17.3812 2.04645ZM2.74867 2.39079L3.20151 2.98865V2.98865L2.74867 2.39079ZM1.75889 3.42267L2.37421 3.85148L1.75889 3.42267ZM17.9044 4.63032H18.6545L18.6544 4.62662L17.9044 4.63032ZM17.2681 13.1137C17.6823 13.1137 18.0181 12.7779 18.0181 12.3637C18.0181 11.9494 17.6823 11.6137 17.2681 11.6137V13.1137ZM14.5408 11.6137C14.1266 11.6137 13.7908 11.9494 13.7908 12.3637C13.7908 12.7779 14.1266 13.1137 14.5408 13.1137V11.6137ZM9.40445 5.25H12.4044V3.75H9.40445V5.25ZM12.4044 20.75H9.40445V22.25H12.4044V20.75ZM9.40445 20.75C7.75321 20.75 6.56745 20.7492 5.64253 20.6613C4.72878 20.5744 4.14735 20.4078 3.68383 20.1237L2.90008 21.4027C3.6389 21.8554 4.477 22.0572 5.50055 22.1545C6.51294 22.2508 7.78225 22.25 9.40445 22.25V20.75ZM0.154447 13C0.154447 14.6222 0.153656 15.8915 0.249915 16.9039C0.347234 17.9274 0.549016 18.7655 1.00177 19.5044L2.28073 18.7206C1.99668 18.2571 1.83006 17.6757 1.74318 16.7619C1.65524 15.837 1.65445 14.6512 1.65445 13H0.154447ZM3.68383 20.1237C3.11197 19.7733 2.63116 19.2925 2.28073 18.7206L1.00177 19.5044C1.47589 20.2781 2.12639 20.9286 2.90008 21.4027L3.68383 20.1237ZM12.4044 22.25C14.0266 22.25 15.296 22.2508 16.3083 22.1545C17.3319 22.0572 18.17 21.8554 18.9088 21.4027L18.1251 20.1237C17.6615 20.4078 17.0801 20.5744 16.1664 20.6613C15.2414 20.7492 14.0557 20.75 12.4044 20.75V22.25ZM19.5282 18.7206C19.1777 19.2925 18.6969 19.7733 18.1251 20.1237L18.9088 21.4027C19.6825 20.9286 20.333 20.2781 20.8071 19.5044L19.5282 18.7206ZM18.1251 5.87628C18.6969 6.22672 19.1777 6.70752 19.5282 7.27938L20.8071 6.49563C20.333 5.72194 19.6825 5.07144 18.9088 4.59732L18.1251 5.87628ZM9.40445 3.75C7.78225 3.75 6.51294 3.74921 5.50055 3.84547C4.477 3.94279 3.6389 4.14457 2.90008 4.59732L3.68383 5.87628C4.14735 5.59223 4.72878 5.42561 5.64253 5.33873C6.56745 5.25079 7.75321 5.25 9.40445 5.25V3.75ZM1.65445 13C1.65445 11.3488 1.65524 10.163 1.74318 9.23809C1.83006 8.32434 1.99668 7.74291 2.28073 7.27938L1.00177 6.49563C0.549016 7.23445 0.347234 8.07256 0.249915 9.09611C0.153656 10.1085 0.154447 11.3778 0.154447 13H1.65445ZM2.90008 4.59732C2.12639 5.07144 1.47589 5.72194 1.00177 6.49563L2.28073 7.27938C2.63116 6.70752 3.11197 6.22672 3.68383 5.87628L2.90008 4.59732ZM8.95752 2.25H14.3262V0.75H8.95752V2.25ZM14.3262 2.25C15.1919 2.25 15.7626 2.25173 16.1858 2.31105C16.5841 2.36687 16.739 2.46039 16.84 2.56562L17.9225 1.52728C17.4993 1.08606 16.9703 0.906351 16.394 0.825567C15.8425 0.748272 15.1478 0.75 14.3262 0.75V2.25ZM8.95752 0.75C7.29732 0.75 5.98939 0.748882 4.95173 0.866088C3.89811 0.985096 3.03414 1.2337 2.29582 1.79293L3.20151 2.98865C3.63924 2.65709 4.20209 2.4603 5.12008 2.35661C6.05404 2.25112 7.26251 2.25 8.95752 2.25V0.75ZM1.65445 9.89563C1.65445 8.13063 1.6554 6.86468 1.75724 5.88472C1.8578 4.91704 2.04994 4.31679 2.37421 3.85148L1.14357 2.99385C0.613397 3.75462 0.378317 4.64188 0.26527 5.72968C0.153499 6.8052 0.154447 8.1627 0.154447 9.89563H1.65445ZM2.29582 1.79293C1.8525 2.12872 1.46389 2.53422 1.14357 2.99385L2.37421 3.85148C2.60579 3.51918 2.8852 3.22823 3.20151 2.98865L2.29582 1.79293ZM18.6544 4.62662C18.6511 3.94995 18.6367 3.36358 18.5519 2.87747C18.4639 2.37228 18.2898 1.91025 17.9225 1.52728L16.84 2.56562C16.9333 2.66295 17.0175 2.80988 17.0742 3.13506C17.1342 3.47932 17.1511 3.94473 17.1545 4.63403L18.6544 4.62662ZM0.154447 9.89563C0.154447 10.8713 0.134287 11.7642 0.154704 12.5202L1.65416 12.4798C1.6344 11.7482 1.65445 10.924 1.65445 9.89563H0.154447ZM20.4044 14.3409H14.5408V15.8409H20.4044V14.3409ZM11.0635 12.3637C11.0635 14.2841 12.6204 15.8409 14.5408 15.8409V14.3409C13.4488 14.3409 12.5635 13.4557 12.5635 12.3637H11.0635ZM12.5635 12.3637C12.5635 11.2716 13.4488 10.3864 14.5408 10.3864V8.88638C12.6204 8.88638 11.0635 10.4432 11.0635 12.3637H12.5635ZM17.2681 11.6137H14.5408V13.1137H17.2681V11.6137ZM12.4044 5.25C13.7891 5.25 14.8494 5.25032 15.708 5.3033C16.5657 5.35623 17.1654 5.45942 17.6382 5.63895L18.1707 4.23667C17.4906 3.97839 16.7164 3.86267 15.8003 3.80615C14.8851 3.74968 13.7718 3.75 12.4044 3.75V5.25ZM17.6382 5.63895C17.8152 5.70619 17.9755 5.7846 18.1251 5.87628L18.9088 4.59732C18.6754 4.45427 18.4305 4.33534 18.1707 4.23667L17.6382 5.63895ZM17.1544 4.63032V4.93781H18.6544V4.63032H17.1544ZM14.5408 10.3864H20.8489V8.88638H14.5408V10.3864ZM21.6544 13C21.6544 11.6255 21.6548 10.5077 21.5974 9.58959L20.1003 9.68316C20.1541 10.5439 20.1544 11.608 20.1544 13H21.6544ZM21.5974 9.58959C21.519 8.33476 21.3291 7.34749 20.8071 6.49563L19.5282 7.27938C19.8571 7.8161 20.0268 8.50707 20.1003 9.68316L21.5974 9.58959ZM20.1544 13C20.1544 13.7875 20.1544 14.4722 20.1444 15.0785L21.6442 15.1034C21.6545 14.4821 21.6544 13.7839 21.6544 13H20.1544ZM20.1444 15.0785C20.1118 17.037 19.9679 18.0031 19.5282 18.7206L20.8071 19.5044C21.4873 18.3944 21.6121 17.0313 21.6442 15.1034L20.1444 15.0785ZM20.4044 15.8409H20.8943V14.3409H20.4044V15.8409Z" fill={color ? "#233DF3" : "#626262"} />
    </svg>
);

export const SidebarLogoutIcon = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.1443 22.77H16.0143C11.5743 22.77 9.43431 21.02 9.06431 17.1C9.02431 16.69 9.32431 16.32 9.74431 16.28C10.1443 16.24 10.5243 16.55 10.5643 16.96C10.8543 20.1 12.3343 21.27 16.0243 21.27H16.1543C20.2243 21.27 21.6643 19.83 21.6643 15.76V9.23998C21.6643 5.16998 20.2243 3.72998 16.1543 3.72998H16.0243C12.3143 3.72998 10.8343 4.91998 10.5643 8.11998C10.5143 8.52998 10.1643 8.83998 9.74431 8.79998C9.32431 8.76998 9.02431 8.39998 9.05431 7.98998C9.39431 4.00998 11.5443 2.22998 16.0143 2.22998H16.1443C21.0543 2.22998 23.1543 4.32998 23.1543 9.23998V15.76C23.1543 20.67 21.0543 22.77 16.1443 22.77Z" fill="#E32504" />
        <path d="M15.9044 13.25H4.52441C4.11441 13.25 3.77441 12.91 3.77441 12.5C3.77441 12.09 4.11441 11.75 4.52441 11.75H15.9044C16.3144 11.75 16.6544 12.09 16.6544 12.5C16.6544 12.91 16.3144 13.25 15.9044 13.25Z" fill="#E32504" />
        <path d="M6.75424 16.5998C6.56424 16.5998 6.37424 16.5298 6.22424 16.3798L2.87424 13.0298C2.58424 12.7398 2.58424 12.2598 2.87424 11.9698L6.22424 8.61984C6.51424 8.32984 6.99424 8.32984 7.28424 8.61984C7.57424 8.90984 7.57424 9.38984 7.28424 9.67984L4.46424 12.4998L7.28424 15.3198C7.57424 15.6098 7.57424 16.0898 7.28424 16.3798C7.14424 16.5298 6.94424 16.5998 6.75424 16.5998Z" fill="#E32504" />
    </svg>
);



export const NewWalletIcon = () => (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.7905 15.9474L3.18237 15.3079L2.7905 15.9474ZM1.55247 14.7094L2.19195 14.3175L1.55247 14.7094ZM15.4473 14.7094L14.8078 14.3175H14.8078L15.4473 14.7094ZM14.2092 15.9474L13.8174 15.3079L14.2092 15.9474ZM14.2092 4.3026L13.8174 4.94208L14.2092 4.3026ZM15.4473 5.54063L14.8078 5.9325H14.8078L15.4473 5.54063ZM2.7905 4.3026L3.18237 4.94208L2.7905 4.3026ZM1.55247 5.54063L2.19195 5.9325L1.55247 5.54063ZM13.3575 1.90984L13.8987 1.39066V1.39066L13.3575 1.90984ZM2.38303 2.16809L2.83588 2.76595L2.83588 2.76595L2.38303 2.16809ZM1.6407 2.942L2.25602 3.37082L1.6407 2.942ZM13.7499 3.84774H14.4999L14.4999 3.84404L13.7499 3.84774ZM13.2726 10.3977C13.6868 10.3977 14.0226 10.062 14.0226 9.64774C14.0226 9.23352 13.6868 8.89774 13.2726 8.89774V10.3977ZM11.2271 8.89774C10.8129 8.89774 10.4771 9.23352 10.4771 9.64774C10.4771 10.062 10.8129 10.3977 11.2271 10.3977V8.89774ZM7.37487 4.5H9.62487V3H7.37487V4.5ZM9.62487 15.75H7.37487V17.25H9.62487V15.75ZM7.37487 15.75C6.13281 15.75 5.25393 15.7492 4.57118 15.6843C3.89959 15.6204 3.49561 15.4999 3.18237 15.3079L2.39862 16.5869C2.98715 16.9475 3.64781 17.1033 4.4292 17.1776C5.19943 17.2508 6.16185 17.25 7.37487 17.25V15.75ZM0.249869 10.125C0.249869 11.338 0.249077 12.3004 0.322311 13.0707C0.396606 13.8521 0.552338 14.5127 0.912988 15.1012L2.19195 14.3175C2 14.0043 1.87943 13.6003 1.81558 12.9287C1.75066 12.2459 1.74987 11.3671 1.74987 10.125H0.249869ZM3.18237 15.3079C2.77871 15.0606 2.43932 14.7212 2.19195 14.3175L0.912988 15.1012C1.28404 15.7067 1.79313 16.2158 2.39863 16.5869L3.18237 15.3079ZM9.62487 17.25C10.8379 17.25 11.8003 17.2508 12.5705 17.1776C13.3519 17.1033 14.0126 16.9475 14.6011 16.5869L13.8174 15.3079C13.5041 15.4999 13.1001 15.6204 12.4286 15.6843C11.7458 15.7492 10.8669 15.75 9.62487 15.75V17.25ZM14.8078 14.3175C14.5604 14.7212 14.221 15.0606 13.8174 15.3079L14.6011 16.5869C15.2066 16.2158 15.7157 15.7067 16.0868 15.1012L14.8078 14.3175ZM13.8174 4.94208C14.221 5.18945 14.5604 5.52884 14.8078 5.9325L16.0868 5.14876C15.7157 4.54326 15.2066 4.03417 14.6011 3.66312L13.8174 4.94208ZM7.37487 3C6.16185 3 5.19943 2.99921 4.4292 3.07244C3.64781 3.14674 2.98715 3.30247 2.39862 3.66312L3.18237 4.94208C3.49561 4.75013 3.89959 4.62956 4.57118 4.56571C5.25393 4.50079 6.13281 4.5 7.37487 4.5V3ZM1.74987 10.125C1.74987 8.88294 1.75066 8.00406 1.81558 7.32131C1.87943 6.64972 2 6.24574 2.19195 5.9325L0.912988 5.14876C0.552338 5.73728 0.396606 6.39795 0.322311 7.17933C0.249077 7.94956 0.249869 8.91199 0.249869 10.125H1.74987ZM2.39863 3.66312C1.79313 4.03417 1.28404 4.54326 0.912988 5.14876L2.19195 5.9325C2.43932 5.52884 2.77871 5.18945 3.18237 4.94208L2.39863 3.66312ZM7.03967 2.25H11.0662V0.75H7.03967V2.25ZM11.0662 2.25C11.721 2.25 12.1335 2.25173 12.4348 2.29397C12.7113 2.33272 12.7808 2.39208 12.8162 2.42901L13.8987 1.39066C13.541 1.01776 13.0976 0.872198 12.6431 0.80849C12.2134 0.748272 11.6768 0.75 11.0662 0.75V2.25ZM7.03967 0.75C5.79887 0.75 4.80549 0.748882 4.01428 0.838251C3.20712 0.929421 2.5215 1.12235 1.93019 1.57024L2.83588 2.76595C3.1266 2.54574 3.5111 2.40462 4.18264 2.32877C4.87015 2.25112 5.76407 2.25 7.03967 2.25V0.75ZM1.74987 7.79672C1.74987 6.46896 1.75082 5.53095 1.82596 4.80792C1.89982 4.09718 2.03856 3.68286 2.25602 3.37082L1.02538 2.51319C0.602012 3.12069 0.420336 3.82201 0.33399 4.65288C0.248921 5.47146 0.249869 6.50103 0.249869 7.79672H1.74987ZM1.93019 1.57024C1.58182 1.8341 1.27672 2.15254 1.02538 2.51319L2.25602 3.37082C2.41861 3.13751 2.61452 2.93361 2.83588 2.76595L1.93019 1.57024ZM14.4999 3.84404C14.4974 3.33812 14.4868 2.88322 14.4202 2.5009C14.3502 2.09951 14.2085 1.7136 13.8987 1.39066L12.8162 2.42901C12.852 2.4663 12.9039 2.53711 12.9425 2.75849C12.9844 2.99895 12.9973 3.33289 12.9999 3.85145L14.4999 3.84404ZM0.249869 7.79672C0.249869 8.52188 0.234734 9.20014 0.25013 9.77025L1.74958 9.72975C1.73485 9.18414 1.74987 8.57462 1.74987 7.79672H0.249869ZM15.6248 10.9432H11.2271V12.4432H15.6248V10.9432ZM8.43169 9.64774C8.43169 11.1916 9.68325 12.4432 11.2271 12.4432V10.9432C10.5117 10.9432 9.93169 10.3632 9.93169 9.64774H8.43169ZM9.93169 9.64774C9.93169 8.93228 10.5117 8.35228 11.2271 8.35228V6.85228C9.68325 6.85228 8.43169 8.10385 8.43169 9.64774H9.93169ZM13.2726 8.89774H11.2271V10.3977H13.2726V8.89774ZM9.62487 4.5C10.6655 4.5 11.4541 4.50032 12.091 4.53962C12.727 4.57887 13.155 4.65469 13.4836 4.7795L14.0161 3.37722C13.4802 3.17367 12.8776 3.08531 12.1833 3.04247C11.4899 2.99968 10.6482 3 9.62487 3V4.5ZM13.4836 4.7795C13.606 4.826 13.7156 4.87974 13.8174 4.94208L14.6011 3.66312C14.4156 3.54941 14.2213 3.45515 14.0161 3.37722L13.4836 4.7795ZM12.9999 3.84774V4.07836H14.4999V3.84774H12.9999ZM11.2271 8.35228H15.9582V6.85228H11.2271V8.35228ZM16.7499 10.125C16.7499 9.09635 16.7502 8.25125 16.7067 7.5555L15.2096 7.64907C15.2495 8.28748 15.2499 9.07884 15.2499 10.125H16.7499ZM16.7067 7.5555C16.6473 6.60453 16.5024 5.82704 16.0867 5.14876L14.8078 5.9325C15.0303 6.29565 15.1551 6.77684 15.2096 7.64907L16.7067 7.5555ZM15.2499 10.125C15.2499 10.7161 15.2498 11.2279 15.2423 11.6807L16.7421 11.7056C16.7499 11.2378 16.7499 10.7125 16.7499 10.125H15.2499ZM15.2423 11.6807C15.2179 13.1535 15.1075 13.8284 14.8078 14.3175L16.0867 15.1012C16.6269 14.2197 16.7182 13.1477 16.7421 11.7056L15.2423 11.6807ZM15.6248 12.4432H15.9922V10.9432H15.6248V12.4432Z" fill="#626262" />
    </svg>
);

export const AddEventIcon = () => (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.29581 14.0338L2.73664 13.4271L2.29581 14.0338ZM1.46619 13.2042L2.07295 12.7634L1.46619 13.2042ZM13.5338 13.2042L12.9271 12.7634L13.5338 13.2042ZM12.7042 14.0338L12.2634 13.4271L12.7042 14.0338ZM12.7042 1.96619L12.2634 2.57295L12.7042 1.96619ZM13.5338 2.79581L12.9271 3.23664L13.5338 2.79581ZM2.29581 1.96619L2.73664 2.57295L2.29581 1.96619ZM1.46619 2.79581L2.07295 3.23664L1.46619 2.79581ZM5.25 7.25C4.83579 7.25 4.5 7.58579 4.5 8C4.5 8.41421 4.83579 8.75 5.25 8.75V7.25ZM9.75 8.75C10.1642 8.75 10.5 8.41421 10.5 8C10.5 7.58579 10.1642 7.25 9.75 7.25V8.75ZM6.75 10.25C6.75 10.6642 7.08579 11 7.5 11C7.91421 11 8.25 10.6642 8.25 10.25H6.75ZM8.25 5.75C8.25 5.33579 7.91421 5 7.5 5C7.08579 5 6.75 5.33579 6.75 5.75H8.25ZM7.5 14C6.07714 14 5.07025 13.999 4.29373 13.9148C3.53125 13.8322 3.08036 13.6768 2.73664 13.4271L1.85497 14.6406C2.497 15.107 3.24205 15.3097 4.13216 15.4061C5.00823 15.501 6.11056 15.5 7.5 15.5V14ZM0 8C0 9.38944 -0.00102943 10.4918 0.0938867 11.3678C0.190324 12.2579 0.392959 13.003 0.859423 13.645L2.07295 12.7634C1.82323 12.4196 1.66777 11.9688 1.58516 11.2063C1.50103 10.4298 1.5 9.42286 1.5 8H0ZM2.73664 13.4271C2.48196 13.242 2.25799 13.018 2.07295 12.7634L0.859423 13.645C1.13698 14.0271 1.47294 14.363 1.85497 14.6406L2.73664 13.4271ZM13.5 8C13.5 9.42286 13.499 10.4298 13.4148 11.2063C13.3322 11.9688 13.1768 12.4196 12.9271 12.7634L14.1406 13.645C14.607 13.003 14.8097 12.2579 14.9061 11.3678C15.001 10.4918 15 9.38944 15 8H13.5ZM7.5 15.5C8.88944 15.5 9.99177 15.501 10.8678 15.4061C11.7579 15.3097 12.503 15.107 13.145 14.6406L12.2634 13.4271C11.9196 13.6768 11.4688 13.8322 10.7063 13.9148C9.92975 13.999 8.92286 14 7.5 14V15.5ZM12.9271 12.7634C12.742 13.018 12.518 13.242 12.2634 13.4271L13.145 14.6406C13.5271 14.363 13.863 14.0271 14.1406 13.645L12.9271 12.7634ZM7.5 2C8.92286 2 9.92975 2.00103 10.7063 2.08516C11.4688 2.16777 11.9196 2.32323 12.2634 2.57295L13.145 1.35942C12.503 0.892959 11.7579 0.690324 10.8678 0.593887C9.99177 0.498971 8.88944 0.5 7.5 0.5V2ZM15 8C15 6.61056 15.001 5.50823 14.9061 4.63216C14.8097 3.74205 14.607 2.997 14.1406 2.35497L12.9271 3.23664C13.1768 3.58036 13.3322 4.03125 13.4148 4.79373C13.499 5.57025 13.5 6.57714 13.5 8H15ZM12.2634 2.57295C12.518 2.75799 12.742 2.98196 12.9271 3.23664L14.1406 2.35497C13.863 1.97294 13.5271 1.63698 13.145 1.35942L12.2634 2.57295ZM7.5 0.5C6.11056 0.5 5.00823 0.498971 4.13216 0.593887C3.24205 0.690324 2.497 0.892959 1.85497 1.35942L2.73664 2.57295C3.08036 2.32323 3.53125 2.16777 4.29373 2.08516C5.07025 2.00103 6.07714 2 7.5 2V0.5ZM1.5 8C1.5 6.57714 1.50103 5.57025 1.58516 4.79373C1.66777 4.03125 1.82323 3.58036 2.07295 3.23664L0.859423 2.35497C0.392959 2.997 0.190324 3.74205 0.0938867 4.63216C-0.00102943 5.50823 0 6.61056 0 8H1.5ZM1.85497 1.35942C1.47294 1.63698 1.13698 1.97294 0.859423 2.35497L2.07295 3.23664C2.25799 2.98196 2.48196 2.75799 2.73664 2.57295L1.85497 1.35942ZM5.25 8.75H9.75V7.25H5.25V8.75ZM8.25 10.25V5.75H6.75V10.25H8.25Z" fill="#626262" />
    </svg>
);

export const NewChatIcon = () => (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.50506 1.5C10.7184 1.5 11.927 1.7993 13.001 2.36552C16.6574 4.29478 18.0636 8.83912 16.1356 12.4968C14.8206 14.9909 12.2315 16.5 9.49647 16.5C8.96214 16.5 8.42253 16.4425 7.88556 16.3236C7.58306 16.2562 7.39218 15.9562 7.45889 15.6536C7.52559 15.351 7.82479 15.1614 8.12927 15.2268C10.9225 15.8479 13.8061 14.5073 15.1423 11.9728C16.7816 8.86356 15.5861 4.9991 12.4772 3.35923C11.5644 2.87757 10.5367 2.6232 9.5044 2.6232H9.49713C5.98271 2.6232 3.12282 5.48339 3.12282 8.99901C3.1215 10.0231 3.37116 11.0426 3.84473 11.9484L3.98871 12.2299C4.16506 12.5602 4.20403 12.9705 4.08977 13.3418C3.93191 13.7581 3.80048 14.1631 3.69216 14.5661C4.11355 14.4393 4.62806 14.2523 4.99991 14.1168L5.15248 14.062C5.44111 13.9543 5.76541 14.1069 5.87109 14.399C5.97676 14.6903 5.82551 15.0128 5.53424 15.1178L5.38365 15.1726L5.35804 15.1819C4.80435 15.3826 4.05881 15.6527 3.5528 15.766C3.50921 15.7752 3.46231 15.7812 3.41938 15.7798C3.07461 15.7798 2.86457 15.6404 2.74899 15.5228C2.57132 15.3424 2.48678 15.0894 2.49669 14.7709C2.49801 14.7346 2.50263 14.6969 2.51122 14.6606C2.64463 14.0924 2.81834 13.5255 3.02837 12.9765C3.04357 12.9229 3.03432 12.8258 2.99139 12.7445L2.84674 12.4637C2.2926 11.4027 1.99868 10.2022 2 8.99835C2 4.86365 5.36318 1.5 9.49647 1.5H9.50506ZM5.30175 8.99986C5.30175 8.50764 5.70134 8.10791 6.1934 8.10791C6.68546 8.10791 7.08505 8.50764 7.08505 8.99986C7.08505 9.49143 6.68546 9.89115 6.1934 9.89115C5.70134 9.89115 5.30175 9.49143 5.30175 8.99986ZM10.3897 8.9984C10.3897 8.50683 9.99015 8.10645 9.49809 8.10645C9.00603 8.10645 8.60644 8.50683 8.60644 8.9984C8.60644 9.48996 9.00603 9.89035 9.49809 9.89035C9.99015 9.89035 10.3897 9.48996 10.3897 8.9984ZM12.7998 8.10645C13.2919 8.10645 13.6915 8.50683 13.6915 8.9984C13.6915 9.48996 13.2919 9.89035 12.7998 9.89035C12.3078 9.89035 11.9082 9.48996 11.9082 8.9984C11.9082 8.50683 12.3078 8.10645 12.7998 8.10645Z" fill="#666666" />
    </svg>
);