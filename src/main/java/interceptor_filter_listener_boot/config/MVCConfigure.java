package interceptor_filter_listener_boot.config;

import interceptor_filter_listener_boot.interceptor.Interceptor1;
import interceptor_filter_listener_boot.listener.Listener1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@SpringBootConfiguration
public class MVCConfigure extends WebMvcConfigurationSupport{

    @Autowired
    Interceptor1 interceptor1;

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor1).addPathPatterns("/**");
    }


    @Bean
    public ServletListenerRegistrationBean servletListenerRegistrationBean(){
        ServletListenerRegistrationBean servletListenerRegistrationBean = new ServletListenerRegistrationBean();
        servletListenerRegistrationBean.setListener(new Listener1());
        return servletListenerRegistrationBean;
    }
}
